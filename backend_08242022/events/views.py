from django.shortcuts import render

# Create your views here.
import email
from urllib import request
from rest_framework import viewsets
from .models import Events
from .serializers import EventSerializer
# myHistoryEventSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAuthenticatedOrReadOnly
from rest_framework import authentication, permissions, generics, status, viewsets, filters
from django.http import HttpResponse, Http404
from rest_framework.response import Response
import sys
sys.path.append('../')
from auth_api.models import Account
from .permissions import IsHostOrReadOnly
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib.auth.mixins import LoginRequiredMixin


class EventsListView(generics.ListAPIView):
    model = Events
    queryset = Events.objects.all().order_by('dateTime')
    permission_classes = [AllowAny]  
    serializer_class = EventSerializer
    paginate_by = 9
    



class UserEventViewSet(viewsets.ModelViewSet):
    model = Events
    queryset = Events.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    permission_classes = (IsAuthenticated,)
    serializer_class = EventSerializer
    
    # def retrieve(self, request, pk):
    def perform_create(self, serializer, **kwargs):
        serializer.save(user=self.request.user)
        
        
        
        
        
    # def destroy(self, request, *args, **kwargs):
        # 削除対象のオブジェクトの取得
        # instance = self.get_object()

        # ここでいろいろ処理を行う

        # 削除対象のオブジェクトを削除
        # instance.delete()

        # HTTPステータスコード204を返す
        # return Response(status=http_status.HTTP_204_NO_CONTENT)
    
class EventDetailView(generics.RetrieveUpdateDestroyAPIView):
    model = Events
    serializer_class = EventSerializer
    queryset = Events.objects.all()
    permission_classes = (IsHostOrReadOnly,)
    
    lookup_field = 'event_id'
    
class MyEventHistory(generics.ListAPIView):
    model = Events
    serializer_class = EventSerializer
    permission_classes = (IsAuthenticated,)
    lookup_field = 'account_id'
    # myevents = Events.objects.filter(host=self.request.host).all()
    # def get_queryset(self):
    def get_queryset(self):
        current_user = self.request.user
        if current_user.is_superuser: # スーパーユーザの場合、リストにすべてを表示する。
            return Events.objects.all()
        else: # 一般ユーザは自分のレコードのみ表示する。
            return Events.objects.filter(host=current_user.account_id).all()
   
    
        
        
        
        
        

class PostEventView(generics.CreateAPIView,LoginRequiredMixin):
    
    model = Events
    queryset = Events.objects.all()
    serializer_class = EventSerializer
    permission_classes = (IsAuthenticated, )
    
    def get_object(self):
        try:
            instance = self.queryset.get(host=self.request.user)
            return instance
        except Events.DoesNotExist:
            raise Http404
    # def perform_create(self,request, *args, **kwargs):
    #     current_user = self.request.user
    #     host=current_user.account_id
        # return Response(data={
        #     'host': request.user.username,
            
        #     },
        #     status=status.HTTP_200_OK)
    def get_object(self):
        current_user = self.request.user
        return current_user.account_id
        return self.request.user
    def perform_create(self, serializer):
        serializer.save(host=self.request.user)
    # def get_queryset(self):
    #     return Events.objects.filter(host=self.request.user.host)
    # def has_object_permission(self, request, view, obj):
    #     """自身のみがGET（詳細）・PUT・PATCH・DELETE許可"""
    #     return obj == request.user
    def get(self, request, format=None):
        return Response(data={
            'host': request.user.username,
            
            },
            status=status.HTTP_200_OK)