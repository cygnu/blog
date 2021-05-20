import graphene
from graphene import relay
from graphene_django.types import DjangoObjectType
from graphql_relay import from_global_id
from blog.scalar import Uuid

from graphene_django.filter import DjangoFilterConnectionField
from graphql_jwt.decorators import login_required

from .models import (
    Tag, Category, Post
)


class TagType(DjangoObjectType):
    class Meta:
        model = Tag


class CategoryType(DjangoObjectType):
    class Meta:
        model = Category


class PostNode(DjangoObjectType):
    class Meta:
        model = Post
        filter_fields = {
            'id': ['exact'],
            'title': ['icontains'],
            'author': ['exact'],
            'content': ['icontains'],
            'tags': ['exact'],
            'tags__name': ['exact'],
            'category': ['exact'],
            'category__name': ['icontains'],
        }
        interfaces = (relay.Node,)


class Query(graphene.ObjectType):
    tag = graphene.Field(
        TagType,
        id=Uuid(),
        name=graphene.String(),
    )
    all_tags = graphene.List(TagType)

    category = graphene.Field(
        CategoryType,
        id=Uuid(),
        name=graphene.String(),
    )
    all_categories = graphene.List(CategoryType)

    post = graphene.Field(
        PostNode,
        id=Uuid(),
        author_username=graphene.String(),
        tags_name=graphene.List(graphene.String),
        category_name=graphene.String(),
    )
    all_posts = DjangoFilterConnectionField(PostNode)

    def resolve_tag(self, info, id, name):
        return Tag.objects.filter(pk=id, name=name).first()

    def resolve_all_tags(self, info, **kwargs):
        return Tag.objects.all()

    def resolve_category(self, info, id, name):
        return Category.objects.filter(pk=id, name=name).first()

    def resolve_all_categories(self, info, **kwargs):
        return Category.objects.all()

    def resolve_post(self, info, id, author__username, tags__name, category__name):
        return Post.objects.filter(
            pk=id,
            author_username=author__username,
            tags_name=tags__name,
            category_name=category__name,
        ).first()

    def resolve_all_posts(self, info, **kwargs):
        return Post.objects.all()


class AddTagInput(graphene.InputObjectType):
    name = graphene.String(required=True)


class AddTagMutation(graphene.Mutation):
    tag = graphene.Field(TagType)

    class Arguments:
        input = AddTagInput(required=True)

    @login_required
    def mutate(self, info, **kwargs):
        tag = Tag.objects.create(**kwargs)
        return AddTagMutation(tag=tag)


class RemoveTagInput(graphene.InputObjectType):
    id = Uuid(required=True)


class RemoveTagMutation(graphene.Mutation):
    tag = graphene.Field(TagType)

    class Arguments:
        input = RemoveTagInput(required=True)

    @login_required
    def mutate(self, info, **kwargs):
        tag = Tag.objects.get(**kwargs)
        tag.delete()
        return RemoveTagMutation(tag=None)


class AddCategoryInput(graphene.InputObjectType):
    name = graphene.String(required=True)


class AddCategoryMutation(graphene.Mutation):
    category = graphene.Field(CategoryType)

    class Arguments:
        input = AddCategoryInput(required=True)

    @login_required
    def mutate(self, info, **kwargs):
        category = Category.objects.create(**kwargs)
        return AddCategoryMutation(category=category)


class RemoveCategoryInput(graphene.InputObjectType):
    id = Uuid(required=True)


class RemoveCategoryMutation(graphene.Mutation):
    category = graphene.Field(CategoryType)

    class Arguments:
        input = RemoveTagInput(required=True)

    @login_required
    def mutate(self, info, **kwargs):
        category = Category.objects.get(**kwargs)
        category.delete()
        return RemoveCategoryMutation(category=None)


class CreatePostMutation(relay.ClientIDMutation):
    post = graphene.Field(PostNode)

    class Input:
        title = graphene.String(required=True)
        description = graphene.String()
        thumbnail = graphene.String()
        content = graphene.String(required=True)
        tags = graphene.List(graphene.String)
        category = graphene.String(required=True)
        is_publish = graphene.Boolean(required=True)

    @login_required
    def mutate_and_get_payload(root, info, **input):
        post = Post.objects.create(
            title=input.get('title'),
            content=input.get('content'),
            is_publish=input.get('is_publish'),
            category=input.get('category'),
        )

        if input.get('tags') is not None:
            tags_set = []
            for tag_name in input.get('tags'):
                tags_object = Tag.objects.get(tag_name)
                tags_set.append(tags_object)
            post.tags.set(tags_set)

        post.save()
        return CreatePostMutation(post=post)


class UpdatePostMutation(relay.ClientIDMutation):
    post = graphene.Field(PostNode)

    class Input:
        id = Uuid(required=True)
        title = graphene.String()
        description = graphene.String()
        thumbnail = graphene.String()
        content = graphene.String()
        tags = graphene.List(Uuid)
        category = graphene.String()
        is_publish = graphene.Boolean(required=True)

    @login_required
    def mutate_and_get_payload(root, info, **input):
        post = Post(
            id=from_global_id(input.get('id'))[1]
        )
        post.title = input.get('title')
        post.content = input.get('content')
        post.category = input.get('category')
        post.is_publish = input.get('is_publish')

        if input.get('tags') is not None:
            tags_set = []
            for tag_id in input.get('tags'):
                tag_id = from_global_id(tag_id)[1]
                tags_object = Tag.objects.get(id=tag_id)
                tags_set.append(tags_object)
            post.tags.set(tags_set)

        post.save()
        return UpdatePostMutation(post=post)


class DeletePostMutation(relay.ClientIDMutation):
    post = graphene.Field(PostNode)

    class Input:
        id = Uuid(required=True)

    @login_required
    def mutate_and_get_payload(root, info, **input):
        post = Post(
            id=from_global_id(input.get('id'))[1]
        )
        post.delete()
        return DeletePostMutation(post=None)


class Mutation(graphene.ObjectType):
    add_tag = AddTagMutation.Field()
    remove_tag = RemoveTagMutation.Field()
    add_category = AddCategoryMutation.Field()
    remove_category = RemoveCategoryMutation.Field()

    create_post = CreatePostMutation.Field()
    update_post = UpdatePostMutation.Field()
    delete_post = DeletePostMutation.Field()
