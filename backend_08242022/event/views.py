from rest_framework import viewsets
from .models import Event
from .serializers import EventSerializer
from rest_framework import generics



class EventsListView(generics.ListAPIView):
    
    queryset = Event.objects.all().order_by('dateTime')
    serializer_class = EventSerializer
    



class UserEventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
       
