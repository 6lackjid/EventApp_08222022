from django.urls import include, path
from rest_framework import routers
from .views import AuthRegister, AccountInfoView,DecoratedTokenObtainPairView,DecoratedTokenRefreshView, AccountChangeView




urlpatterns = [
    # path('v', include(router.urls)),
    path('register/', AuthRegister.as_view()), #◎
    path('mypage/', AccountInfoView.as_view()),  #◎
    
    path('change/<str:account_id>/', AccountChangeView.as_view()),
    
    
    
    
    path('token/create/', DecoratedTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', DecoratedTokenRefreshView.as_view(), name='token_refresh'),
    
]
