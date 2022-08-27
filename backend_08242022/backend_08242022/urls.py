


from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_jwt.views import obtain_jwt_token,verify_jwt_token,refresh_jwt_token

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('api/token/', obtain_jwt_token),
    path('api/token/verify/', verify_jwt_token),
    path('api/token/refresh/', refresh_jwt_token),
    
    path('api/', include('auth_api.urls')),
    path('api/event/', include('event.urls'))
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)