from rest_framework import serializers
from .models import Message
from account.models import User
from trip.models import Trip


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.SlugRelatedField(
        many=False, slug_field='name', queryset=User.objects.all())
    group_id = serializers.SlugRelatedField(
        many=False, slug_field='id', queryset=Trip.objects.all())

    class Meta:
        model = Message
        fields = ['sender', 'message', 'timestamp', 'group_id']
