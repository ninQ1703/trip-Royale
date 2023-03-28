from django.contrib import admin
from .models import User, Split, SplitDistribution, Todo

admin.site.register(User)
admin.site.register(Split)
admin.site.register(SplitDistribution)
admin.site.register(Todo)