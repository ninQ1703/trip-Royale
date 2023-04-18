from django.urls import path, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from .views import Event, AllEvent, NewTask, DelTask
app_name = 'scheduler'
  
urlpatterns = [
    path('schedule/<str:date>/events',Event.as_view(),name='event'),
    path('schedule',AllEvent.as_view(),name='allevent'),
    path('newSchedule',NewTask.as_view(),name='newtask'),
    path('schedule/<str:date>/events/<int:task_id>',DelTask.as_view(),name='deltask'),
    
]