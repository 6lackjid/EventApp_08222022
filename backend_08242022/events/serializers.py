from auth_api.models import Account
from rest_framework import serializers
from django.db.models import Q
from .models import Events 

class EventSerializer(serializers.ModelSerializer):
    
    dateTime = serializers.DateTimeField(format='%Y年-%m月-%d日 %H時:%M分:%S秒')
    capacity = serializers.IntegerField(max_value=None, min_value=0)
    host = serializers.CharField()
    
    
    class Meta:
        model = Events 
        
        fields = '__all__'
        # fields = ('dateTime', 'capacity', 'title', 'location', 'description', 'EventImage1', 'EventImage2', 'EventImage3')
        read_only_fields = ('host',)
        extra_kwargs = {'host': {'read_only': True}}

    

    