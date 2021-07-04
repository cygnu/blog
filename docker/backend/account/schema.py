import graphene
import graphql_jwt
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model
from blog.scalar import Uuid
from graphql_jwt.decorators import login_required

from .models import Profile, LinkInBio


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()


class UserProfile(DjangoObjectType):
    class Meta:
        model = Profile


class LinkInBioType(DjangoObjectType):
    class Meta:
        model = LinkInBio


class Query(graphene.ObjectType):
    viewer = graphene.Field(UserProfile)
    all_users = graphene.List(UserType)

    profile = graphene.Field(
        UserProfile,
        user_id=Uuid(),
        username=graphene.String()
    )
    all_profiles = graphene.List(UserProfile)

    @login_required
    def resolve_viewer(self, info, **kwargs):
        return Profile.objects.get(user_prof=info.context.user.id)

    @login_required
    def resolve_all_users(self, info, **kwargs):
        return get_user_model().objects.all()

    @login_required
    def resolve_profile(self, info, user_id, username):
        return Profile.objects.filter(user_id=user_id, username=username).first()

    @login_required
    def resolve_all_profiles(self, info, **kwargs):
        return Profile.objects.all()


class CreateUserInput(graphene.InputObjectType):
    email = graphene.String(required=True)
    password = graphene.String(required=True)


class CreateUserMutation(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        input = CreateUserInput(required=True)

    def mutate(self, info, input):
        user = get_user_model()(
            email=input.email
        )
        user.set_password(input.password)
        user.save()

        return CreateUserMutation(user=user)


class CreateUserProfileInput(graphene.InputObjectType):
    username = graphene.String(required=True)
    first_name = graphene.String()
    last_name = graphene.String()


class CreateLinkInBioInput(graphene.InputObjectType):
    github_url = graphene.String(required=True)
    qiita_url = graphene.String()
    twitter_url = graphene.String()
    website_url = graphene.String()


class CreateProfileInput(graphene.InputObjectType):
    user_prof_input = graphene.Field(CreateUserProfileInput)
    local = graphene.String()
    bio = graphene.String()
    bio_prof_input = graphene.Field(CreateLinkInBioInput)
    created_at = graphene.types.datetime.DateTime()


class CreateProfileMutation(graphene.Mutation):
    profile = graphene.Field(UserProfile)

    class Arguments:
        input = CreateProfileInput(required=True)

    @login_required
    def mutate(self, info, **kwargs):
        profile = Profile.objects.create(**kwargs)
        return CreateProfileMutation(profile=profile)


class UpdateUserProfileInput(graphene.InputObjectType):
    id = Uuid(required=True)
    first_name = graphene.String()
    last_name = graphene.String()
    email = graphene.String()


class UpdateLinkInBioInput(graphene.InputObjectType):
    id = Uuid(required=True)
    github_url = graphene.String()
    qiita_url = graphene.String()
    twitter_url = graphene.String()
    website_url = graphene.String()


class UpdateProfileInput(graphene.InputObjectType):
    id = Uuid(required=True)
    user_prof_input = graphene.Field(UpdateUserProfileInput)
    local = graphene.String()
    bio = graphene.String()
    bio_prof_input = graphene.Field(UpdateLinkInBioInput)
    updated_at = graphene.types.datetime.DateTime()


class UpdateProfileMutation(graphene.Mutation):
    profile = graphene.Field(UserProfile)

    class Arguments:
        input = UpdateProfileInput(required=True)

    @login_required
    def mutate(self, info, **kwargs):
        profile = Profile.objects.create(**kwargs)
        return UpdateProfileMutation(profile=profile)


class CreateLinkInBioMutation(graphene.Mutation):
    link_in_bio = graphene.Field(LinkInBioType)

    class Arguments:
        input = CreateLinkInBioInput(required=True)

    @login_required
    def mutate(self, info, **kwargs):
        bio = LinkInBio.objects.create(**kwargs)
        return CreateLinkInBioMutation(link_in_bio=bio)


class UpdateLinkInBioMutation(graphene.Mutation):
    link_in_bio = graphene.Field(LinkInBioType)

    class Arguments:
        input = UpdateLinkInBioInput(required=True)

    @login_required
    def mutate(self, info, **kwargs):
        bio = LinkInBio.objects.create(**kwargs)
        return UpdateLinkInBioMutation(link_in_bio=bio)


class Mutation(graphene.ObjectType):
    create_user = CreateUserMutation.Field()

    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

    create_profile = CreateProfileMutation.Field()
    update_profile = UpdateProfileMutation.Field()
    create_link_in_bio = CreateLinkInBioMutation.Field()
    update_link_in_bio = UpdateLinkInBioMutation.Field()
