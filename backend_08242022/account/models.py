
import email
from django.db import models
import uuid

# Create your models here.
class Account(models.Model):
    account_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nickname = models.CharField(max_length=100, unique=True, verbose_name="ユーザ名")
    last_name = models.CharField(max_length=10, verbose_name="姓")
    first_name = models.CharField(max_length=10, verbose_name="名")
    email = models.EmailField(unique=True, verbose_name="メールアドレス")
    password = models.CharField(max_length=70, verbose_name="パスワード")
    
    def __str__(self):
        return str(self.account_id) + self.email