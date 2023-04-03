from rest_framework import serializers
from .models import Split, SplitDistribution

class SplitSerializer(serializers.ModelSerializer):
    # owner = UserSerializer(read_only = True)
    class Meta:
        model = Split
        fields = ('id','trip','owner','amount','creation_date','tag')


class SplitDistributionSerializer(serializers.ModelSerializer):
    # split = SplitSerializer(read_only = True)
    # debtor = UserSerializer( read_only = True)
    class Meta:
        model = SplitDistribution
        fields = ('id','split','debtor','amount','paid')


class PaidSerializer(serializers.ModelSerializer):
    class Meta:
        model = SplitDistribution
        fields = ('paid',)