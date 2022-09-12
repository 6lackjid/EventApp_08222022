from auth_api.models import Account
from rest_framework import serializers
from django.db.models import Q
from .models import Events 

class EventSerializer(serializers.ModelSerializer):
    
    dateTime = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    capacity = serializers.IntegerField(max_value=None, min_value=0)
    host = serializers.CharField()
    
    
    class Meta:
        model = Events 
        fields = '__all__'
        read_only_fields = ('event_id',)
        
# class myHistoryEventSerializer(serializers.ModelSerializer):
#     class Meta:
#         fields = '__all__'
#         model = Events
#     queryset = Events.objects.all()
#     serializer = EventSerializer(queryset, many=True)
    
    
class HistoryFilter(serializers.ModelSerializer):
    
    class Meta:
        model = Events
        fields = '__all__'
        
        extra_kwargs = {'host':{'read_only': True}}
        
    def get_queryset(self):
        request = self.context['request']
        hostname = Events.objects.filter(Q(host=request.host))
            
            
            
    
    
        
               
        