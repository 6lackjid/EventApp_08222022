# Generated by Django 4.1 on 2022-08-25 10:26

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('event_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100, verbose_name='イベントタイトル')),
                ('location', models.CharField(max_length=100, verbose_name='開催場所')),
                ('description', models.TextField(max_length=2000, verbose_name='イベントの概要')),
                ('dateTime', models.DateTimeField(verbose_name='日時')),
                ('capacity', models.PositiveIntegerField(verbose_name='定員人数')),
                ('EventImage', models.ImageField(upload_to='', verbose_name='イベントのイメージ')),
            ],
        ),
    ]