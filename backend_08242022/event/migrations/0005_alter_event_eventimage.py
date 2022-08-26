# Generated by Django 4.0.6 on 2022-08-25 21:55

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0004_alter_event_eventimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='EventImage',
            field=models.ImageField(null=True, upload_to='event_images/self.event_id/%Y/%m/%d/', validators=[django.core.validators.FileExtensionValidator(['pdf', 'jpg', 'png'])], verbose_name='イベントのイメージ'),
        ),
    ]
