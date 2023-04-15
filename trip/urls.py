from django.urls import path, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from .views import MyTrips,MyTripsAsLeader,TripAttendees,TripLeader,TripInfo, NewTrip
app_name = 'trip'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('leader_trips',MyTripsAsLeader.as_view(),name='mytrips_leader'),
    path('trips',MyTrips.as_view(),name='mytrips'),
    path('<int:trip_id>/attendees',TripAttendees.as_view(),name='attendees'),
    path('<int:trip_id>/leader',TripLeader.as_view(),name='leader'),
    path('<int:trip_id>/',TripInfo.as_view(),name='tripinfo'),
    path('newTrip',NewTrip.as_view(),name='newtrip'),

    path('<int:trip_id>/',include('budgetPlanner.urls',namespace='budgetPlanner')),
    path('<int:trip_id>/',include('photos.urls',namespace='photos')),
    path('<int:trip_id>/',include('scheduler.urls',namespace='scheduler')),
]