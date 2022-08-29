import email
from rest_framework import viewsets
from .models import Event
from .serializers import EventSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAuthenticatedOrReadOnly
from rest_framework import authentication, permissions, generics, status, viewsets, filters
from django.http import HttpResponse, Http404
import sys
sys.path.append('../')
from auth_api.models import Account
class EventsListView(generics.ListAPIView):
    model = Event
    queryset = Event.objects.all().order_by('dateTime')
    permission_classes = [AllowAny]  
    serializer_class = EventSerializer
    paginate_by = 9
    



class UserEventViewSet(viewsets.ModelViewSet):
    model = Event
    queryset = Event.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    permission_classes = (IsAuthenticated,)
    serializer_class = EventSerializer
    
    # def retrieve(self, request, pk):
        
        
        
        
        
    # def destroy(self, request, *args, **kwargs):
    #     # 削除対象のオブジェクトの取得
    #     instance = self.get_object()

    #     # ここでいろいろ処理を行う

    #     # 削除対象のオブジェクトを削除
    #     instance.delete()

    #     # HTTPステータスコード204を返す
    #     return Response(status=http_status.HTTP_204_NO_CONTENT)
    
class EventDetailView(generics.RetrieveUpdateDestroyAPIView):
    model = Event
    serializer_class = EventSerializer
    queryset = Event.objects.all()
    permission_classes = (IsAuthenticatedOrReadOnly,) 
    
    
class MyEventHistory(generics.RetrieveUpdateAPIView):
    model = Event
    serializer_class = EventSerializer
    queryset = Event.objects.filter()
    permission_classes = (IsAuthenticated,)
    
    lookup_field = 'host'
    
    # def get_queryset(self, *args, **kwargs):
    #     return super().get_queryset(*args, **kwargs).filter(
    #         host_id=self.kwargs['host']
    #     )
    
    # get_sameuserevents = Event.objects.filter(host_id=str(Account.pk))
    def get_a_user_events(self, request, **kwargs):
        
    #     return Response(data={
    #         'host': request.host.host_id,
            
    #     },
    #     status=status.HTTP_200_OK)
        event_by_user = Event.objects.filter(host_id=self.kwargs['host'])
        return event_by_user