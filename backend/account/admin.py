from django.contrib import admin

from .models import (
    User, LinkInBio, Profile
)


# Register your models here.
admin.site.register(User)
admin.site.register(LinkInBio)
admin.site.register(Profile)
