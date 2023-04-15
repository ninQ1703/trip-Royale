from django.db import models
from trip.models import Trip
from account.models import User
# Create your models here.

class Photo(models.Model):
    src = models.CharField(max_length=200, default="")
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    uploader = models.ForeignKey(User, on_delete=models.DO_NOTHING)