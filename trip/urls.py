from django.urls import path, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
app_name = 'trip'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('<int:trip_id>/',include('budgetPlanner.urls',namespace='budgetPlanner')),
    path('<int:trip_id>/',include('photos.urls',namespace='photos')),
]