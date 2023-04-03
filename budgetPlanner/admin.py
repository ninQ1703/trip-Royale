from django.contrib import admin
from .models import User, Split, SplitDistribution, Trip, TripUser

admin.site.register(User)
admin.site.register(Split)
admin.site.register(SplitDistribution)
admin.site.register(Trip)
admin.site.register(TripUser)