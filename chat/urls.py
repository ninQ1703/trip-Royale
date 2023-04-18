from django.urls import path, include
from django.contrib import admin
from . import views
from .views import *
from rest_framework.routers import DefaultRouter
app_name = 'chat'

urlpatterns = [
    # For GET request.
    path('messages/', views.message_list, name='message-detail'),
    path('messages/', views.all_message_list,
         name='message-list'),   # For POST
    path('post/', MessagePost.as_view(), name='message_post'),

]
