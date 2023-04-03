from django.urls import path, include
from django.contrib import admin
from .views import MySplits, DetailedMySplits, MyPendingSplitsByOwner, TotalByOwners, GetTotalDebt, GetTotalDebtByTag,  isPaid, CreateSplit, CreateSplitDistribution, MarkPaid, isPaidbyOwner
from rest_framework.routers import DefaultRouter
app_name = 'budgetPlanner'
 
  
urlpatterns = [
    path('newsplit/',CreateSplit.as_view(),name='createnewsplit'),
    path('markpaid/<int:id>/',MarkPaid.as_view(),name='markitpaid'),
    path('newsplitdist/',CreateSplitDistribution.as_view(),name='createnewsplitdist'),
    path('paid/<int:split_id>/',isPaid.as_view(),name='paidsplits'),
    path('mydebt/<int:owner_id>/', MyPendingSplitsByOwner.as_view(), name='mypendingsplits'),
    path('mydebtbyowner/<int:owner_id>/', TotalByOwners.as_view(),name='mytotaldebtbyowner'),
    path('mytotaldebt/', GetTotalDebt.as_view(), name = 'mytotaldebt'),
    path('mysplits/<int:split_id>/', DetailedMySplits.as_view(), name='detailedmysplits'),
    path('mysplits/', MySplits.as_view(),name='mysplits'),
    path('ispaidbyowner/<int:owner_id>/', isPaidbyOwner.as_view(),name='paidinfobyowner'),
    path('mydebtbytag/<str:tag>/', GetTotalDebtByTag.as_view(), name='mytotaldebtbytag'),
]