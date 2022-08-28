from django.urls import include, path
from rest_framework import routers
from .views import AuthRegister, AuthInfoGetView

urlpatterns = [
    path('register/', AuthRegister.as_view()), #◎
    path('mypage/', AuthInfoGetView.as_view()),  #◎
    
]