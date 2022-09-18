from django.contrib.auth import update_session_auth_hash,get_user_model,authenticate
from rest_framework import serializers
# from rest_framework import TokenObtainPairSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Account, AccountManager, profile_image
# from .settings import api_settings

class AccountSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Account
        fields = ( 'username', 'email', 'password','first_name', 'last_name','ProfileImage')
        
        # 'id','passwordConfirm'
        extra_kwargs = {'password': {'write_only': True, 'required': True, 'min_length': 8}}

    def create(self, validated_data):
        account =  Account.objects.create_user(request_data=validated_data)
        
        return account
    
    
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        return token


class TokenObtainPairResponseSerializer(serializers.Serializer):
    access = serializers.CharField()
    refresh = serializers.CharField()

    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()

class TokenRefreshResponseSerializer(serializers.Serializer):
    access = serializers.CharField()
    refresh = serializers.CharField()

    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()
    
    



