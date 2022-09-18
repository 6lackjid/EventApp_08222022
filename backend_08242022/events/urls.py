from django.urls import include, path
from rest_framework import routers
from .views import EventsListView, UserEventViewSet,EventDetailView,MyEventHistory,PostEventView,EventDetailView
import sys
sys.path.append('../')
from auth_api.models import Account

router = routers.DefaultRouter()

router.register(r'user-event/', UserEventViewSet)


urlpatterns = [
    # path('', include(router.urls)),
    path('lists/', EventsListView.as_view(), name='events-list'),
    path('myevent/<str:event_id>',EventDetailView.as_view()),
    path('post-event/', PostEventView.as_view()),
    path('mypage/myevent-history/', MyEventHistory.as_view(), name='event-history'),
    
    
    
    ]