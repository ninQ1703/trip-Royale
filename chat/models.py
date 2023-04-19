from tkinter import CASCADE
from django.db import models
from account.models import User
from trip.models import Trip


class Message(models.Model):
    sender = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='sender')
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    group_id = models.ForeignKey(
        Trip, on_delete=models.CASCADE, related_name='trip_message')

    def __str__(self):
        return self.message

    class Meta:
        ordering = ('timestamp',)
