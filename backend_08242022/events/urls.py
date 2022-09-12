from django.urls import include, path
from rest_framework import routers
from .views import EventsListView, UserEventViewSet,EventDetailView,MyEventHistory
import sys
sys.path.append('../')
from auth_api.models import Account

router = routers.DefaultRouter()

router.register(r'user-event', UserEventViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('lists/', EventsListView.as_view(), name='events-list'),
    path('mypage/event-history/<int:host>/', MyEventHistory.as_view(), name='event-history')
    
    ]