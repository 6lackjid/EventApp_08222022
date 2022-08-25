# Generated by Django 4.1 on 2022-08-25 11:08

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('account_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('nickname', models.CharField(max_length=100, unique=True, verbose_name='ユーザ名')),
                ('last_name', models.CharField(max_length=10, verbose_name='姓')),
                ('first_name', models.CharField(max_length=10, verbose_name='名')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='メールアドレス')),
                ('password', models.CharField(max_length=70, verbose_name='パスワード')),
            ],
        ),
    ]
