from tkinter import CASCADE
from django.db import models

# Create your models here.

class User(models.Model):   
    # id = models.IntegerField(primary_key=True) 
    first_name = models.CharField(max_length=250)
    last_name = models.CharField(max_length=250)
    email = models.CharField(max_length=250)
    mob = models.PositiveIntegerField()
    age = models.IntegerField()
    # trips_created
    # trips_attended
    # schedule_user
    def _str_(self):
        return self.name

class Trip(models.Model):
    # id = models.IntegerField(primary_key=True)
    dest = models.CharField(max_length=250)
    name = models.CharField(max_length=250)
    leader = models.ForeignKey(User, on_delete=models.CASCADE, related_name="trips_created")
    attendees = models.ManyToManyField(User, related_name="trips_attended")
    start_date = models.DateField()
    end_date = models.DateField()
    # schedule_trip
    def _str_(self):
        return self.dest

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

