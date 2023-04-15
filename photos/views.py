from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Photo
from .serializers import PhotoSerializer
# Create your views here.

class PhotoURLListView(APIView):
    def get(self,request,me,trip_id):
        query = Photo.objects.filter(trip=trip_id)
        serialized_class = PhotoSerializer(query, many = True)
        return Response(serialized_class.data)

class PhotoUpload(APIView):
    def post(self,request,me, trip_id):
        serializer_obj = PhotoSerializer(data = request.data)
        if serializer_obj.is_valid():
            serializer_obj.save()
            return Response(serializer_obj.data,status=status.HTTP_201_CREATED)
        return Response(serializer_obj.errors, status=status.HTTP_400_BAD_REQUEST)