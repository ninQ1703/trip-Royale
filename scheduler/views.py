import operator
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework import status
from rest_framework import mixins
from rest_framework import generics
from rest_framework.decorators import action
from operator import itemgetter
# Create your views here.

   
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
    
#POST
class NewTask(APIView):
    def post(self,request,me,trip_id):
        serializer_obj = PlannerSerializer(data = request.data)
        if serializer_obj.is_valid():
            serializer_obj.save()
            return Response(serializer_obj.data,status=status.HTTP_201_CREATED)
        return Response(serializer_obj.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DelTask(APIView):
   def delete(self, request, task_id, me, trip_id,date):
        plan = Planner.objects.get(id=task_id)
        plan.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

