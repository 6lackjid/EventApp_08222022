from django.contrib import admin
from .models import Account
from django.contrib.auth.admin import UserAdmin

# list_filter  = [ "username","email", "first_name", "last_name" ]


admin.site.register(Account)

# , UserAdmin