from tkinter import CASCADE
from django.db import models
from trip.models import Trip
from account.models import User

# Create your models here.

class Planner(models.Model):
    # id = models.IntegerField(primary_key=True)
    desc = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    loc = models.CharField(max_length=250)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="schedule_trip")
    added_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="schedule_user")

    def _str_(self):
        return self.event
