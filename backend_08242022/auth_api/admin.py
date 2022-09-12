from django.contrib import admin
from .models import Account

list_filter         = [ "username","email", "first_name", "last_name" ]


admin.site.register(Account)