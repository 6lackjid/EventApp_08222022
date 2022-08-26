from xmlrpc.client import DateTime
from django.db import models
import uuid
from account.models import Account 
from django.core.validators import FileExtensionValidator 




def event_images(instance, filename):
    ext = filename.split('.')[-1]
    event_id = instance.event_id
    datetime = instance.dateTime
    EventImage = instance.EventImage
    return f'event_images/{event_id}/{datetime}/{EventImage}.{ext}'

class Event(models.Model):
    event_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100, verbose_name="イベントタイトル" )
    location = models.CharField(max_length=100, verbose_name="開催場所")
    description = models.TextField(max_length=2000,verbose_name="イベントの概要")
    dateTime = models.DateTimeField(verbose_name="日時")
    capacity = models.PositiveIntegerField(verbose_name="定員人数")
    
    EventImage= models.ImageField(verbose_name="イベントのイメージ",upload_to=event_images, null=True, validators=[FileExtensionValidator(['pdf','jpg', 'png' ])])
    host = models.ForeignKey(Account, on_delete=models.PROTECT, default="")
     
    def __str__(self):
        return str(self.event_id) +'_' + self.title + '_' + str(self.dateTime)