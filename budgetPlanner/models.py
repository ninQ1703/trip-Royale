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


class Split(models.Model):
    tag_options = (
        ('dining', 'Dining'),
        ('travel','Travel'),
        ('stay','Stay'),
        ('adventure','Adventure'),
        ('shopping','Shopping'),
        ('others','Others'),
    )
    creation_date = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.FloatField(default=0.00)
    tag = models.CharField(max_length=10, choices=tag_options,default= 'others')
    number_of_debtors = models.IntegerField(default=1)

class SplitDistribution(models.Model):
    split = models.ForeignKey(Split,on_delete=models.CASCADE)
    debtor = models.ForeignKey( User, on_delete=models.CASCADE)
    amount = models.FloatField(default=0.00)   
