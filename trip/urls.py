from django.urls import path, include
from django.contrib import admin
from .views import getAllUsers, getUser
from rest_framework.routers import DefaultRouter
app_name = 'trip'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', getAllUsers.as_view(),name='allusers'),   #will go to trip app
    path('users/<int:user_id>/',getUser.as_view(), name="getuser"),#global
    path('<int:me>/<int:trip_id>/',include('budgetPlanner.urls',namespace='budgetPlanner')),
]