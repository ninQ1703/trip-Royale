from django.urls import path, include
from django.contrib import admin
from .views import MySplits, DetailedMySplits, MyPendingSplitsByOwner, TotalByOwners, GetTotalDebt, GetTotalDebtByTag
from rest_framework.routers import DefaultRouter
app_name = 'budgetPlanner'
  

urlpatterns = [

    path('mysplits/<int:owner_id/', MySplits.as_view(),name='mysplits'),
    path('mysplits/<int:owner_id>/<int:split_id>/', DetailedMySplits.as_view(), name='detailedmysplits'),
    path('mydebt/<int:debtor_id>/<int:owner_id>/', MyPendingSplitsByOwner.as_view(), name='mypendingsplits'),
    path('mydebtbyowner/<int:debtor_id>/<int:owner_id>/', TotalByOwners.as_view(),name='mytotaldebtbyowner'),
    path('mytotaldebt/<int:debtor_id>/', GetTotalDebt.as_view(), name = 'mytotaldebt'),
    path('mydebtbytag/<int:debtor_id>/<str:tag>/', GetTotalDebtByTag.as_view(), name='mytotaldebtbytag'),
]