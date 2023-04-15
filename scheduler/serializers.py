from rest_framework import serializers
from .models import *

class PlannerSerializer(serializers.ModelSerializer):
    # trip = TripSerializer()
    # added_by = UserSerializer()
    class Meta:
        model = Planner
        fields = "__all__" 
        