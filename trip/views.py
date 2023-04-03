import operator
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserIDSerializer, UserSerializer
from .models import User,TripUser
from rest_framework import status
from rest_framework import mixins
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.decorators import action
from operator import itemgetter
# Create your views here.


# list of all users
class getAllUsers(APIView):
    def get(self, request):
        query = User.objects.all()
        serialized_class = UserSerializer(query, many = True)
        serialized_data = serialized_class.data
        serialized_data.sort(key=operator.itemgetter('first_name')) 
        return Response(serialized_data)

class getUser(APIView):
    def get(self, request, user_id):
        query = User.objects.filter(id = user_id)
        serialized_class = UserSerializer(query, many = True)
        return Response(serialized_class.data)
