from django.shortcuts import render
from django.db import transaction
from django.http import HttpResponse, Http404
from rest_framework import authentication, permissions, generics, status, viewsets, filters
import django
import os
import sys

# from rest_framework_jwt.settings import api_settings
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import AccountSerializer
from .models import Account, AccountManager


class AuthRegister(generics.CreateAPIView):
    model = Account
    permission_classes = (permissions.AllowAny,)
    serializer_class = AccountSerializer

    @transaction.atomic
    def post(self, request, format=None):
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

   

class AccountInfoView(generics.RetrieveAPIView):
    model = Account
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get(self, request, format=None):
        return Response(data={
            'id': request.user.id,
            'username': request.user.username,
            'email': request.user.email,
        },
        status=status.HTTP_200_OK)
