from django.urls import include, path
from rest_framework import routers
from .views import AuthRegister, AccountInfoView




urlpatterns = [
    path('register/', AuthRegister.as_view()), #◎
    path('mypage/', AccountInfoView.as_view()),  #◎
    
]