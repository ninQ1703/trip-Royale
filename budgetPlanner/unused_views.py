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



class UserModelViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# class SplitModelViewSet(APIView):
#     def get(self, request):
#         query = Split.objects.all()
#         serializer_class = SplitSerializer(query,many = True)
#         return Response(serializer_class.data)

#     def post(self, request):
#         serialized_obj = SplitSerializer(data = request.data)
#         if(serialized_obj.is_valid(raise_exception=True)):
#             Split_saved = serialized_obj.save()
#             return Response(format(Split_saved))
#         return(serialized_obj.error)
    
    

# class DetailedSplitModelViewSet(APIView):
#     def get(self, request, pk):
#         query = Split.objects.filter(id = pk)
#         serializer_class = SplitSerializer(query,many = True)
#         return Response(serializer_class.data)
    
#     def put(self, request, pk):
#         Split_obj = Split.objects.get(id = pk)
#         serialized_obj = SplitSerializer(Split_obj,data = request.data)
#         if(serialized_obj.is_valid(raise_exception=True)):
#             Split_saved = serialized_obj.save()
#             return Response(format(Split_saved))
#         return(serialized_obj.error)
    
#     def delete(self, request, pk):
#         Split_obj = Split.objects.get(id = pk)
#         Split_obj.delete()
#         return Response(stsus= status.HTTP_400_BAD_REQUEST)


# class SplitDistributionModelViewSet(viewsets.ModelViewSet):
#     pass

# class SplitBorrowers(APIView):
#     def get(self, request, split_id):
#         query = SplitDistribution.objects.filter(split = split_id)
#         serializer_class = SplitDistributionSerializer(query,many = True)
#         return Response(serializer_class.data)

class SplitModelViewSet(viewsets.ModelViewSet):
    queryset = Split.objects.all()
    serializer_class = SplitSerializer

    # @action(detail=True, methods=['get'])
    # def komal(self, request,pk,owner_id):
    #     query = Split.objects.filter(owner = owner_id).filter(id = pk)
    #     serialized_data = SplitSerializer(query,many = True)
    #     return Response(serialized_data.data)

    # def get_queryset(self):
    #     pass

class SplitViewByUser(APIView):
    def get(self, request, owner_id):
        query = Split.objects.filter(owner = owner_id)
        serializer_class = SplitSerializer(query,many = True)
        return Response(serializer_class.data)
    

class AllMyPendingSplits(APIView):
    def get(self, request, debtor_id):
        query = SplitDistribution.objects.filter(debtor = debtor_id)
        serialized_splitDistribution = SplitDistributionSerializer(query,many = True)
        SplitIdList = []
        amountList = []
        for i in range(len(serialized_splitDistribution.data)):
            SplitIdList.append(serialized_splitDistribution.data[i]['split'])
            amountList.append(serialized_splitDistribution.data[i]['amount'])
        serialized_class = []
        for i in range(len(SplitIdList)):
            query = (Split.objects.filter(id = SplitIdList[i]))
            serialized_data = SplitSerializer(query,many = True).data
            serialized_data[0]['amount'] = amountList[i]
            serialized_class.extend(serialized_data)
        return Response(serialized_class)
    

class MyPendingSplitsByOwner(APIView):
    def get(self, request, debtor_id, owner_id):
        query = SplitDistribution.objects.filter(debtor = debtor_id)
        serialized_splitDistribution = SplitDistributionSerializer(query,many = True)
        SplitIdList = []
        amountList = []
        for i in range(len(serialized_splitDistribution.data)):
            SplitIdList.append(serialized_splitDistribution.data[i]['split'])
            amountList.append(serialized_splitDistribution.data[i]['amount'])
        serialized_class = []
        for i in range(len(SplitIdList)):
            query = (Split.objects.filter(id = SplitIdList[i]))
            query = query.filter(owner = owner_id)
            serialized_data = SplitSerializer(query,many = True).data
            if serialized_data :
                serialized_data[0]['amount'] = amountList[i]
            serialized_class.extend(serialized_data)
        return Response(serialized_class)     


class AllMyPendingSplitsByOwner(APIView):
    def get(self, request, debtor_id):
        query = SplitDistribution.objects.filter(debtor = debtor_id)
        serialized_splitDistribution = SplitDistributionSerializer(query,many = True)
        SplitIdList = []
        amountList = []
        for i in range(len(serialized_splitDistribution.data)):
            SplitIdList.append(serialized_splitDistribution.data[i]['split'])
            amountList.append(serialized_splitDistribution.data[i]['amount'])
        serialized_class = []
        for i in range(len(SplitIdList)):
            query = (Split.objects.filter(id = SplitIdList[i]))
            serialized_data = SplitSerializer(query,many = True).data
            serialized_data[0]['amount'] = amountList[i]
            serialized_class.extend(serialized_data)
        serialized_class.sort(key=operator.itemgetter('owner')) 
        MySplits = []
        j = 1
        i = 0
        while i < (len(serialized_class)):
            newList = []
            while i < len(serialized_class):
                if serialized_class[i]['owner'] != j :
                    break
                newList.append(serialized_class[i])
                i = i + 1
            
            name = User.objects.get(id = j)
            serialized_name = UserSerializer(name)
            if name and newList and j != debtor_id:
                owner_name = serialized_name.data['first_name']
                MySplits.append(owner_name)
                MySplits.append(newList)

            j = j + 1

        return Response(MySplits)
