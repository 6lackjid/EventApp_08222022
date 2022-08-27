from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers

from .models import Account, AccountManager


class AccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        return Account.objects.create_user(request_data=validated_data)