from django.urls import include, path
from rest_framework import routers
from .views import EventsListView

urlpatterns = [
    path('', EventsListView.as_view(), name='events')
]