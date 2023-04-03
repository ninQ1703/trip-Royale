from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.
class User(models.Model):
    gmail = models.CharField(max_length=250)
    first_name = models.CharField(max_length=250)
    last_name = models.CharField(max_length=250, blank = True)
    profile = models.ImageField(default='profile.jfif')
    def __str__(self):
        return self.first_name

class Trip(models.Model):
    name = models.CharField(max_length=50)
    leader = models.ForeignKey(User, on_delete= models.CASCADE)
    
    start_date = models.DateField()
    end_date = models.DateField()

class TripUser(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)