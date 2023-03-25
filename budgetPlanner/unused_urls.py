from django.urls import path
# from .views import SplitModelViewSet, UserModelViewSet, SplitViewByUser, AllMyPendingSplits, MyPendingSplitsByOwner, AllMyPendingSplitsByOwner
from .views import MySplits, DetailedMySplits, MyPendingSplitsByOwner
from rest_framework.routers import DefaultRouter
app_name = 'budgetPlanner'

# router = DefaultRouter()
# router.register('usermodelviewset',UserModelViewSet,basename='user')
# router.register('splitmodelviewset',SplitModelViewSet,basename='splits')
urlpatterns = [
    # path('splits/usersplit/<int:owner_id>', SplitViewByUser.as_view(),name='UserSplit'),
    # path('mysplits/<int:debtor_id>/',AllMyPendingSplits.as_view(),name='pending'),
    # path('mysplitsbyowner/<int:debtor_id>/<int:owner_id>/',MyPendingSplitsByOwner.as_view(),name='pendingbyowner'),
   # path('allmysplitsbyowner/<int:debtor_id>/',AllMyPendingSplitsByOwner.as_view(), name= 'allpending')
    # path('allsplits/',SplitModelViewSet.as_view(),name='AllSplits'),
    # path('allsplits/<int:pk>/',DetailedSplitModelViewSet.as_view(),name='MySplits'),
    # path('allsplits/<int:split_id>/borrowers/',SplitBorrowers.as_view(),name='MySplitsBorrowers')
]
# urlpatterns+=router.urls