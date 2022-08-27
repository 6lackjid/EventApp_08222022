from django.db import models
import uuid

from auth_api.models import Account


def event_images(instance, filename):
    ext = filename.split('.')[-1]
    datetime = instance.dateTime 
    host = instance.host
    event_id = instance.event_id
    return f'event_image/{host}/{datetime}/{event_id}'


class Event(models.Model):
    event_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100, verbose_name="イベントタイトル" )
    location = models.CharField(max_length=100, verbose_name="開催場所")
    description = models.TextField(max_length=2000,verbose_name="イベントの概要")
    dateTime = models.DateTimeField(verbose_name="日時")
    capacity = models.PositiveIntegerField(verbose_name="定員人数")
    EventImage= models.ImageField(verbose_name="イベントのイメージ",upload_to=event_images)
    host = models.ForeignKey(Account, on_delete=models.PROTECT)
     
    def __str__(self):
        return str(self.event_id) +'_' + self.title + '_' +str(self.dateTime)
