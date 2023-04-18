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
from operator import itemgetter
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
# Create your views here.

@csrf_exempt
def message_list(request, trip_id=None, me=None):
    if request.method == 'GET':
        messages = Message.objects.filter(group_id=trip_id)
        serializer = MessageSerializer(messages, many=True, context={'request': request})
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = MessageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
def all_message_list(request, me=None, trip_id=None):
    """
    List all required messages, or create a new message.
    """
    if request.method == 'GET':
        messages = Message.objects.all()
        serializer = MessageSerializer(messages, many=True, context={'request': request})
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = MessageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
class MessagePost(APIView):
   def post(self,request, me, trip_id):
      serializer_obj = MessageSerializer(data = request.data)
      if serializer_obj.is_valid():
        serializer_obj.save()
        return Response(serializer_obj.data,status=status.HTTP_201_CREATED)
      return Response(serializer_obj.errors,status = status.HTTP_400_BAD_REQUEST)   


