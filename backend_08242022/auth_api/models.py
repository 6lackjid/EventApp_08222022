
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, _user_has_perm
from django.core import validators
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
import uuid
from django.contrib.auth.hashers import make_password
from django.contrib.auth import password_validation


def profile_image(instance, filename):
    ext = filename.split('.')[-1]
    username = instance.username 
    email = instance.email
    account_id = instance.account_id
    return f'profile_image/{account_id}/{username}/{email}'

class AccountManager(BaseUserManager):
    def create_user(self, request_data, **kwargs):
        now = timezone.now()
        if not request_data['email']:
            raise ValueError('メールアドレスが正しくありません')


        user = self.model(
            username=request_data['username'],
            email=self.normalize_email(request_data['email']),
            
            is_active=True,
            last_login=now,
            date_joined=now,
        )

        user.set_password(request_data['password'])
        user.save(using=self._db)
        return user
# createsuperuserで作成されるユーザーの定義
    def create_superuser(self, username, email, password, **extra_fields):
        request_data = {
            'username': username,
            'email': email,
            'password': password
        }

        user = self.create_user(request_data)
        user.set_password(request_data['password'])
        user.is_active = True
        user.is_staff = True
        user.is_admin = True
        user.save(using=self._db)
        return user
        
        

class Account(AbstractBaseUser):
    account_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(_('username'), max_length=30, unique=True)
    first_name = models.CharField(
        _('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)
    email = models.EmailField(
        verbose_name='email address', max_length=255, unique=True)
    
    ProfileImage = models.ImageField(verbose_name="プロフィール画像",upload_to=profile_image, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    date_joined = models.DateTimeField(
        _('date joined'), default=timezone.now)

    objects = AccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'last_name','first_name']

    def user_has_perm(user, perm, obj):
        return _user_has_perm(user, perm, obj)

    def has_perm(self, perm, obj=None):
        return _user_has_perm(self, perm, obj=obj)

    def has_module_perms(self, app_label):
        return self.is_admin

    def get_short_name(self):
        return self.first_name

    @property
    def is_superuser(self):
        return self.is_admin

    class Meta:
        db_table = 'auth_user'
        swappable = 'AUTH_USER_MODEL'
    
    def validate_password(self,value:str) ->str:
        """
        ハッシュ値に変換する
        """
        return make_password(value)
    def validate_password(self, password):
    # 入力JSONで指定されたpasswordに対してsettings.AUTH_PASSWORD_VALIDATORSで指定したバリデーションを実行
        if password_validation.validate_password(password) is False:
            raise Account.ValidationError(f'The password {password} is not valid')
            return password

    # ユーザー作成時にパスワードを暗号化する
    def create(self, validated_data):
    # 後で使うので入力された生のパスワードを取得しておく
        unhashed_password = validated_data.pop('password', None)
    # パスワードを削除した入力データからUser型のインスタンスを生成
        new_user = self.Meta.model(**validated_data)
    # パスワードをハッシュ化してセットし、DBに保存
        if unhashed_password is not None:
          new_user.set_password(unhashed_password)
          new_user.save()
        return new_user

  # ユーザー更新時にパスワードを暗号化する
    def update(self, pre_update_user, validated_data):
    # 更新されるユーザーのフィールドを入力データの値に書き換えていく
        for field_name, value in validated_data.items():
      # passwordを更新する際は入力データの値をset_password()の引数に渡してハッシュ化
            if field_name == 'password':
              pre_update_user.set_password(value)
        # password以外のフィールドを更新する際は入力データでそのまま上書きでOK
            else:
              setattr(pre_update_user, field_name, value)
              pre_update_user.save()
        return pre_update_user

    def __str__(self):
        return self.username 
    #  + '_' + self.email  + '|____|' + str(self.account_id) 
    #   
