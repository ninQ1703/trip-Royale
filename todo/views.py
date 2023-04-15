import operator
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializer import *
from rest_framework import status
from rest_framework import mixins
from rest_framework import generics
from rest_framework.decorators import action
from operator import itemgetter
# Create your views here.

# get user list
class AllUsers(APIView):
    def get(self, request):
        query = User.objects.all()
        serialized_class = UserSerializer(query, many = True)
        return Response(serialized_class.data)

# get my trips
class MyTrips(APIView):
    def get(self, request, me):
        query = Trip.objects.filter(attendees = me)
        serialized_class = TripSerializer(query, many = True)
        return Response(serialized_class.data)
    
# get my trips as leader  
class MyTripsAsLeader(APIView):
    def get(self, request, me):
        query = Trip.objects.filter(leader = me)
        serialized_class = TripSerializer(query, many = True)
        return Response(serialized_class.data)
    
# get a particular trip info
class TripInfo(APIView):
    def get(self, request, me, trip_id):
        query = Trip.objects.get(id=trip_id)
        serialized_class = TripSerializer(query)
        return Response(serialized_class.data)

# todo: filter according to current user    
# get attendees of trip    
class TripAttendees(APIView):
    def get(self, request, trip_id, me):
        query = User.objects.filter(trips_attended = trip_id)
        serialized_class = UserSerializer(query, many = True)
        return Response(serialized_class.data)

# get leader of trip    
class TripLeader(APIView):
    def get(self, request, trip_id, me):
        query = User.objects.filter(trips_created = trip_id)
        serialized_class = UserSerializer(query, many = True)
        return Response(serialized_class.data)

# get start date of trip    
class StartDate(APIView):
    def get(self, request, trip_id, me):
        query = Trip.objects.filter(id = trip_id)
        serialized_class = TripSerializer(query, many = True).data
        return Response(serialized_class[0]['start_date'])
    
# get end date of trip    
class EndDate(APIView):
    def get(self, request, trip_id, me):
        query = Trip.objects.filter(id = trip_id)
        serialized_class = TripSerializer(query, many = True).data
        return Response(serialized_class[0]['end_date'])
    
# get events todo according to date and trip    
class Event(APIView):
    def get(self, request, date, me,trip_id):
        query = Planner.objects.filter(trip=trip_id).filter(date=date)
        serialized_class = PlannerSerializer(query, many = True).data
        return Response(serialized_class)
    
# get events of trip    
class AllEvent(APIView):
    def get(self, request, me,trip_id):
        query = Planner.objects.filter(trip=trip_id)
        serialized_class = PlannerSerializer(query, many = True).data
        return Response(serialized_class)
    
# POST methods
class NewTrip(APIView):
    def post(self,request,me):
        serializer_obj = TripSerializer(data = request.data)
        if serializer_obj.is_valid():
            serializer_obj.save()
            return Response(serializer_obj.data,status=status.HTTP_201_CREATED)
        return Response(serializer_obj.errors, status=status.HTTP_400_BAD_REQUEST)

class NewTask(APIView):
    def post(self,request,me,trip_id):
        serializer_obj = PlannerSerializer(data = request.data)
        if serializer_obj.is_valid():
            serializer_obj.save()
            return Response(serializer_obj.data,status=status.HTTP_201_CREATED)
        return Response(serializer_obj.errors, status=status.HTTP_400_BAD_REQUEST)




    # {
    #     "dest": "Goa",
    #     "name": "Execution",
    #     "start_date": "2023-04-03",
    #     "end_date": "2023-04-27",
    #     "leader": 1,
    #     "attendees": [
    #         1,
    #         2
    #     ]
    # }
    # {
    #     "desc": "lkdnvf",
    #     "date": "2023-04-03",
    #     "time": "12:44",
    #     "loc": "lkfdn",
    #     "trip": 1,
    #     "added_by": 1
    # }