from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render
from rest_framework import status
from rest_framework import viewsets
from .models import *
from .serializer import *
from rest_framework.permissions import *
from rest_framework.decorators import action
# from .permissions import *
from rest_framework.response import Response
from django.http import HttpResponse, HttpResponseForbidden, JsonResponse, HttpResponseRedirect,HttpResponseBadRequest
# from . import oauth_info
import requests
# from django.contrib.auth import login,logout,authenticate
import json
from .models import *
# import pandas as pd
from django.db.models import Count
from datetime import date
# Create your views here.

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    # def get_attendees(self):
    #     tripid = self.request.query_params.get('id')
    #     queryset = self.queryset
    #     attendees = queryset.filter(leader=self.request.user)
    #     trip_id=self.request.query_params['id']
    #     queryset=User.objects.filter(id,trip_id=id)

class TripView(viewsets.ModelViewSet):
    serializer_class = TripSerializer
    queryset = Trip.objects.all()
    @action(detail=None)
    def update(self, request, *args, **kwargs):
        obj_id = kwargs['pk']
        obj = Trip.objects.get(pk=obj_id)
        return Response(TripSerializer.data,status=status.HTTP_200_OK)    
        
    

class PlannerView(viewsets.ModelViewSet):
    serializer_class = PlannerSerializer
    queryset = Planner.objects.all()

@api_view(['GET', 'POST'])
def snippet_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        snippets = Snippet.objects.all()
        serializer = SnippetSerializer(snippets, many=True)
        return Response(serializer.data)
