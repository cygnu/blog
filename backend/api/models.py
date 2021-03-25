from django.db import models
from django.contrib.auth import get_user_model

from markdownx.models import MarkdownxField
import uuid


# Create your models here.
class Tag(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name


class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=150)
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    description = models.CharField(
        blank=True,
        null=True,
        max_length=255
    )
    thumbnail = models.ImageField(
        blank=True,
        null=True,
        upload_to="uploads/%Y/%m/%d/",
    )
    content = MarkdownxField()
    tags = models.ManyToManyField(Tag, blank=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    is_publish = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
