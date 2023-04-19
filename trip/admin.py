from django.contrib import admin
from .models import Trip
# Register your models here.
class TripAdmin(admin.ModelAdmin):
    list_display = ('id', 'dest', 'name', 'leader', 'start_date', 'end_date')  # attendees
admin.site.register(Trip, TripAdmin)