from rest_framework import serializers
from .models import Trip

class TripSerializer(serializers.ModelSerializer):
    # leader = UserSerializer()
    # attendees = UserSerializer(many=True)
    class Meta:
        model = Trip
        fields = "__all__" 
