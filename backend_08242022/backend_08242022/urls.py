


from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
# from rest_framework_jwt.views import obtain_jwt_token,verify_jwt_token,refresh_jwt_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    # path('accounts/', include('django.contrib.auth.urls')), 
    path('api/auth/', include('djoser.urls.jwt')),

    path('api/account/', include('auth_api.urls')),
    path('api/events/', include('events.urls'))
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)