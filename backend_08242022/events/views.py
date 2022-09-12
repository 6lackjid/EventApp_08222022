from django.shortcuts import render

# Create your views here.
import email
from urllib import request
from rest_framework import viewsets
from .models import Events
from .serializers import EventSerializer, HistoryFilter
# myHistoryEventSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAuthenticatedOrReadOnly
from rest_framework import authentication, permissions, generics, status, viewsets, filters
from django.http import HttpResponse, Http404

import sys
sys.path.append('../')
from auth_api.models import Account


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
    permission_classes = (IsAuthenticatedOrReadOnly,) 
    
    
class MyEventHistory(generics.RetrieveUpdateDestroyAPIView):
    model = Events
    serializer_class = HistoryFilter
    permission_classes = (IsAuthenticated,)
    lookup_field = 'host'
    queryset = Events.objects.all()
    # def get_queryset(self):
       
    
        
        # queryhost = self.request.query_params.get('host')

        # if queryhost:
        #     queryset = queryset.filter(host=queryhost)
    
    # def get_queryset(self):
       
        # queryset = Events.objects.all()
        # host = self.request.query_params.get('host')
        # if host is not None:
        #     queryset = queryset.filter(Events__host=host)
        
    # def get_queryset(self):
    #     queryset = Events.objects.filter(host=self.kwargs["host"], idlistaprecio=self.kwargs["email"])
        
        # return queryset