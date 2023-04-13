from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from trip.models import Trip, TripUser
from account.models import User
# Create your models here.

class Split(models.Model):
    tag_options = (
        ('dining', 'Dining'),
        ('travel','Travel'),
        ('stay','Stay'),
        ('adventure','Adventure'),
        ('shopping','Shopping'),
        ('others','Others'),
    )
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    creation_date = models.DateField(auto_now_add=True,)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.FloatField(default=0.00)
    tag = models.CharField(max_length=10, choices=tag_options,default= 'others')
    number_of_debtors = models.IntegerField(default=1)

class SplitDistribution(models.Model):
    split = models.ForeignKey(Split,on_delete=models.CASCADE)
    debtor = models.ForeignKey( User, on_delete=models.CASCADE)
    amount = models.FloatField(default=0.00)   
    paid = models.BooleanField(default=False)

   
