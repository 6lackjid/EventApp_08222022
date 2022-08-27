from rest_framework import viewsets
from .models import Event
from .serializers import EventSerializer

class PostViewSet(viewsets.ModelViewSet):
    
    queryset = Event.objects.all().order_by('-dateTime')
    serializer_class = EventSerializer
