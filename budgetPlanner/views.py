import operator
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Split, SplitDistribution
from .serializers import SplitDistributionSerializer, SplitSerializer ,PaidSerializer
from rest_framework import status
from rest_framework import mixins
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.decorators import action
from operator import itemgetter
# Create your views here.


# all splits created by me with details
class MySplits(APIView):
    def get(self, request, me):
        query = Split.objects.filter(owner = me)
        serialized_class = SplitSerializer(query, many = True)
        return Response(serialized_class.data)


# get a single split of me
class DetailedMySplits(APIView):
    def get(self, request, me, split_id):
        query = SplitDistribution.objects.filter(split = split_id)
        serialized_class = SplitDistributionSerializer(query, many =True)
        return Response(serialized_class.data)
    

#owner splits where I am involved 
class MyPendingSplitsByOwner(APIView):
    def get(self, request, me, owner_id):
        query = SplitDistribution.objects.filter(debtor = me)
        serialized_splitDistribution = SplitDistributionSerializer(query,many = True)
        serialized_class = []
        for i in range(len(serialized_splitDistribution.data)):
            query = Split.objects.filter(id = (serialized_splitDistribution.data[i]['split']))
            query = query.filter(owner = owner_id)
            serialized_data = SplitSerializer(query, many = True).data
            if serialized_data:
                serialized_data[0]['paid'] = serialized_splitDistribution.data[i]['paid']
                serialized_data[0]['amount'] = serialized_splitDistribution.data[i]['amount']
            serialized_class.extend(serialized_data)

        return Response(serialized_class) 

#how much I owe an owner
class GetTotalDebt(APIView):
    def get(self, request, me):
        query = SplitDistribution.objects.filter(debtor = me)
        serialized_data = SplitDistributionSerializer(query, many = True).data
        total = 0
        for i in range(len(serialized_data)):
            total += serialized_data[i]['amount']
    
        return Response(total)


class GetTotalDebtByTag(APIView):
    def get(self, request, me, tag):
        query = SplitDistribution.objects.filter(debtor = me)
        serialized_data = SplitDistributionSerializer(query, many = True).data
        total = 0
        for i in range(len(serialized_data)):
            query = Split.objects.filter(id = serialized_data[i]['split'])
            Splitserialized_data = SplitSerializer(query, many = True).data
            if tag==Splitserialized_data[0]['tag']:
                total += serialized_data[i]['amount']
    
        return Response(total)


class TotalByOwners(APIView):
    def get(self, request, me, owner_id):
        query = SplitDistribution.objects.filter(debtor = me)
        serialized_splitDistribution = SplitDistributionSerializer(query,many = True)
        total = 0
        for i in range(len(serialized_splitDistribution.data)):
            query = Split.objects.filter(id = (serialized_splitDistribution.data[i]['split']))
            query = query.filter(owner = owner_id)
            if query:
                total += serialized_splitDistribution.data[i]['amount']

        return Response(total) 
    
class isPaid(APIView):
    def get(self,request,me, split_id):
        query = SplitDistribution.objects.filter(split = split_id)
        serialized_data = PaidSerializer(query,many = True).data
        isPaidfully  = True
        for i in range(len(serialized_data)):
            isPaidfully = isPaidfully and serialized_data[i]['paid']
        return Response(isPaidfully)
    
class isPaidbyOwner(APIView):
    def get(self,request,me,owner_id):
        query = SplitDistribution.objects.filter(debtor = me)
        serialized_splitDistribution = SplitDistributionSerializer(query,many = True)
        paid = True
        for i in range(len(serialized_splitDistribution.data)):
            query = Split.objects.filter(id = (serialized_splitDistribution.data[i]['split']))
            query = query.filter(owner = owner_id)
            if query:
                paid = paid&serialized_splitDistribution.data[i]['paid']

        return Response(paid)
    

# POST methods
class CreateSplit(APIView):
    def post(self,request,me):
        serializer_obj = SplitSerializer(data = request.data)
        if serializer_obj.is_valid():
            serializer_obj.save()
            return Response(serializer_obj.data,status=status.HTTP_201_CREATED)
        return Response(serializer_obj.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CreateSplitDistribution(APIView):
    def post(self,request,me):
        serializer_obj = SplitDistributionSerializer(data = request.data)
        if serializer_obj.is_valid():
            serializer_obj.save()
            return Response(serializer_obj.data,status=status.HTTP_201_CREATED)
        return Response(serializer_obj.errors, status=status.HTTP_400_BAD_REQUEST)

class MarkPaid(APIView):
    def put(self,request,me,id):
        query = SplitDistribution.objects.get(id=id)
        serializer = PaidSerializer(query, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)