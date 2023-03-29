import operator
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User, Split, SplitDistribution, Todo
from .serializers import UserSerializer, SplitDistributionSerializer, SplitSerializer , UserIDSerializer, TodoSerializer, PaidSerializer
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

# all splits created by me with details
class MySplits(APIView):
    def get(self, request, owner_id):
        query = Split.objects.filter(id = owner_id)
        serialized_class = SplitSerializer(query, many = True)
        return Response(serialized_class.data)


# get a single split of me
class DetailedMySplits(APIView):
    def get(self, request, owner_id, split_id):
        query = SplitDistribution.objects.filter(split = split_id)
        serialized_class = SplitDistributionSerializer(query, many =True)
        return Response(serialized_class.data)
    

#owner splits where I am involved 
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

#how much I owe an owner
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
    
class TodoView(viewsets.ModelViewSet):  
    serializer_class = TodoSerializer   
    queryset = Todo.objects.all()    

class isPaid(APIView):
    def get(self,request,split_id):
        query = SplitDistribution.objects.filter(split = split_id)
        serialized_data = PaidSerializer(query,many = True).data
        isPaidfully  = True
        for i in range(len(serialized_data)):
            isPaidfully = isPaidfully and serialized_data[i]['paid']
        return Response(isPaidfully)