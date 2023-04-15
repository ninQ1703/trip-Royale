from django.contrib import admin
from .models import Planner

# Register your models here.

class PlannerAdmin(admin.ModelAdmin):
    list_display = ('id', 'desc', 'date', 'time', 'loc', 'trip', 'added_by')
admin.site.register(Planner, PlannerAdmin)