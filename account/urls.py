from django.urls import path, include
from account.views import *
app_name = 'account'

urlpatterns = [
    path('users/', getAllUsers.as_view(),name='allusers'),   #will go to trip app
    path('users/<int:user_id>/',getUser.as_view(), name="getuser"),#global
    path('register/',UserRegistrationView.as_view(), name='register'),
    path('login/',UserLoginView.as_view(),name="login"),
    path('profile/',UserProfileView.as_view(),name='profile'),
    path('changepassword/',UserChangePasswordView.as_view(),name='changepassword'),
    path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), name='reset-password'),
    path('<int:me>/',include('trip.urls',namespace='trip'))
]
