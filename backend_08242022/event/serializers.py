from auth_api.models import Account
from rest_framework import serializers

from .models import Event 

class EventSerializer(serializers.ModelSerializer):
    
    dateTime = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    capacity = serializers.IntegerField(max_value=None, min_value=0)
    host = serializers.CharField()
    class Meta:
        model = Event 
        fields = '__all__'
        read_only_fields = ('event_id',)
       
        