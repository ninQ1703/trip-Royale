from rest_framework import serializers
from .models import User, TripUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','first_name','last_name')

class UserIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id',)

