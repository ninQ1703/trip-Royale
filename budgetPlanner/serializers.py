from rest_framework import serializers
from .models import User, Split, SplitDistribution, Todo
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','first_name','last_name')

class UserIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id',)


class SplitSerializer(serializers.ModelSerializer):
    # owner = UserSerializer(read_only = True)
    class Meta:
        model = Split
        fields = ('id','owner','amount','creation_date','tag','number_of_debtors')


class SplitDistributionSerializer(serializers.ModelSerializer):
    # split = SplitSerializer(read_only = True)
    # debtor = UserSerializer( read_only = True)
    class Meta:
        model = SplitDistribution
        fields = ('id','split','debtor','amount')

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id' ,'title', 'description', 'completed')