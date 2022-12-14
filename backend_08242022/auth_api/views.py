from django.shortcuts import render,get_list_or_404, get_object_or_404
from django.db import transaction
from django.http import HttpResponse, Http404
from rest_framework import authentication, permissions, generics, status, viewsets, filters
import django
import os
import sys
from django.contrib.auth.decorators import login_required
# sys.path.append('../')
# from .settings import api_settings,JSONRenderer,BrowsableAPIRenderer,JSONParser,FormParser,MultiPartParser
# from .exceptions import AuthenticationFailed
from rest_framework.response import Response
# from .views import APIView
from .serializers import AccountSerializer
from .models import Account, AccountManager
from .serializers import MyTokenObtainPairSerializer,TokenObtainPairResponseSerializer,TokenRefreshResponseSerializer
# from .views import (
#     TokenObtainPairView,
#     TokenRefreshView,
    
# )
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from drf_yasg.utils import swagger_auto_schema
from django.contrib.auth.decorators import login_required

from rest_framework.permissions import IsAuthenticated
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
            'acccount_id': request.user.account_id,
            'last_name': request.user.last_name,
            'first_name': request.user.first_name,
            'username': request.user.username,
            'email': request.user.email,
            'ProfileImage': str(request.user.ProfileImage),
        },
        status=status.HTTP_200_OK)
        
        
# test
class MyAccountListView(generics.ListAPIView):
    queryset = Account.objects.all()
    serialzers_class = AccountSerializer
    
    def get_queryset(self):
        return self.queryset.filter(host=self.request.user)
    
        


# @login_required
class AccountChangeView(generics.RetrieveUpdateDestroyAPIView):
  
    
      model = Account
    #   fields = ["username", "email", "ProfileImage"]
      permission_classes = (permissions.IsAuthenticated,)
      queryset = Account.objects.all()
      serializer_class = AccountSerializer
      lookup_field = 'account_id'
    #   def get_object(self):
    #         queryset = self.get_queryset()
    #         obj = get_object_or_404(queryset, account_id=self.request.account_id)
    #         return obj
    #   @login_required
      def post(self, request, format=None):
        account_id = request.user.account_id
        
        return Response(data={
            'account_id':request.user.account_id,
            
            'username': request.user.username,
            'last_name': request.user.last_name,
            'first_name': request.user.first_name,
            'email': request.user.email,
            'ProfileImage': request.user.ProfileImage,
        },
        status=status.HTTP_200_OK)
        
    #   @login_required
      def update(self, request, format=None):
        return Response(data={
            'account_id': request.user.account_id,
            'username': request.user.username,
            'email': request.user.email,
            'ProfileImage': request.user.ProfileImage,
        },
        status=status.HTTP_200_OK)   
        
class ObtainTokenPairWithColorView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    

class DecoratedTokenObtainPairView(TokenObtainPairView):
    @swagger_auto_schema(responses={status.HTTP_200_OK: TokenObtainPairResponseSerializer})
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

class DecoratedTokenRefreshView(TokenRefreshView):
    @swagger_auto_schema(responses={status.HTTP_200_OK: TokenRefreshResponseSerializer})
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
    
