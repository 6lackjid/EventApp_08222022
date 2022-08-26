
import email
from django.db import models
import uuid

# Create your models here.

def profile_icon(instance, filename):
    ext = filename.split('.')[-1]
    new_name = instance.email
    account_id = instance.account_id
    return f'profile_icon/{account_id}/{new_name}.{ext}'

class Account(models.Model):
    account_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nickname = models.CharField(max_length=100, unique=True, verbose_name="ユーザ名")
    last_name = models.CharField(max_length=10, verbose_name="姓")
    first_name = models.CharField(max_length=10, verbose_name="名")
    profile_icon = models.ImageField(verbose_name="プロフィールアイコン",upload_to=profile_icon, null=True)
    email = models.EmailField(unique=True, verbose_name="メールアドレス")
    password = models.CharField(max_length=70, verbose_name="パスワード")
    
    def __str__(self):
        return str(self.account_id) +" _ " +self.email