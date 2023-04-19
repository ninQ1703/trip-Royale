from django.urls import path, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from .views import PhotoURLListView, PhotoUpload
app_name = 'photos'
  
urlpatterns = [
    path('photos/',PhotoURLListView.as_view(),name='photos'),
    path('photos/upload/',PhotoUpload.as_view(),name='photos_upload'),
]