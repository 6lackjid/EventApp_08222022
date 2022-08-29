from django.urls import include, path
from rest_framework import routers
from .views import EventsListView, UserEventViewSet,EventDetailView,MyEventHistory

router = routers.DefaultRouter()

router.register(r'user-event', UserEventViewSet)


urlpatterns = [
    path('', EventsListView.as_view(), name='events-list'),
    path('', include(router.urls)),
    path('{uuid:event_id}/', EventDetailView.as_view(), name='event-detail'),
    path('mypage/event-history/<host>', MyEventHistory.as_view(), name='event-history')
    
    # path('post/', )
]