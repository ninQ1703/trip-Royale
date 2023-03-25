import operator
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User, Split, SplitDistribution
from .serializers import UserSerializer, SplitDistributionSerializer, SplitSerializer 
from rest_framework import status
from rest_framework import mixins
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.decorators import action
from operator import itemgetter
# Create your views here.

class MySplits(APIView):
    def get(self, request, owner_id):
        query = Split.objects.filter(id = owner_id)
        serialized_class = SplitSerializer(query, many = True)
        return Response(serialized_class.data)


class DetailedMySplits(APIView):
    def get(self, request, owner_id, split_id):
        query = SplitDistribution.objects.filter(id = split_id)
        serialized_class = SplitDistributionSerializer(query, many =True)
        return Response(serialized_class.data)
    

class MyPendingSplitsByOwner(APIView):
    def get(self, request, debtor_id, owner_id):
        query = SplitDistribution.objects.filter(debtor = debtor_id)
        serialized_splitDistribution = SplitDistributionSerializer(query,many = True)
        serialized_class = []
        for i in range(len(serialized_splitDistribution.data)):
            query = Split.objects.filter(id = (serialized_splitDistribution.data[i]['split']))
            query = query.filter(owner = owner_id)
            serialized_data = SplitSerializer(query, many = True).data
            if serialized_data:
                serialized_data[0]['amount'] = serialized_splitDistribution.data[i]['amount']
            serialized_class.extend(serialized_data)

        return Response(serialized_class) 


class GetTotalDebt(APIView):
    def get(self, request, debtor_id):
        query = SplitDistribution.objects.filter(debtor = debtor_id)
        serialized_data = SplitDistributionSerializer(query, many = True).data
        total = 0
        for i in range(len(serialized_data)):
            total += serialized_data[i]['amount']
    
        return Response(total)


class GetTotalDebtByTag(APIView):
    def get(self, request, debtor_id, tag):
        query = SplitDistribution.objects.filter(debtor = debtor_id)
        serialized_data = SplitDistributionSerializer(query, many = True).data
        total = 0
        for i in range(len(serialized_data)):
            query = Split.objects.filter(id = serialized_data[i]['split'])
            Splitserialized_data = SplitSerializer(query, many = True).data
            if tag==Splitserialized_data[0]['tag']:
                total += serialized_data[i]['amount']
    
        return Response(total)


class TotalByOwners(APIView):
    def get(self, request, debtor_id, owner_id):
        query = SplitDistribution.objects.filter(debtor = debtor_id)
        serialized_splitDistribution = SplitDistributionSerializer(query,many = True)
        total = 0
        for i in range(len(serialized_splitDistribution.data)):
            query = Split.objects.filter(id = (serialized_splitDistribution.data[i]['split']))
            query = query.filter(owner = owner_id)
            if query:
                total += serialized_splitDistribution.data[i]['amount']

        return Response(total) 
    
