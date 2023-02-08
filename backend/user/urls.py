from django.urls import path
from .views import (CreateUserView,VerifyApiView,GetNewVerification,
                    FinishSignUpApiView,SetPasswordApiView,
                    ResetPasswordApiView,ResetPasswordConfirmationApiView,
                    LoginApiVew,UpdateUserProfileApiView,GetProfileAPiView)

urlpatterns=[
    path('signup/',CreateUserView.as_view(),name='signup'),
    path('login/',LoginApiVew.as_view(),name='login'),
    path('verify/',VerifyApiView.as_view(),name='verify'),
    path('update_profile/',UpdateUserProfileApiView.as_view(),name='update'),
    path('get_profile/',GetProfileAPiView.as_view(),name='get_profile'),
    path('new_verify/',GetNewVerification.as_view(),name='new_verify'),
    path('finish/',FinishSignUpApiView.as_view(),name='finish_signup'),
    path('set_password/',SetPasswordApiView.as_view(),name='set_password'),
    path('reset_password/',ResetPasswordApiView.as_view(),name='reset_password'),
    path('reset_password_confirm/',ResetPasswordConfirmationApiView.as_view(),name='reset_password_confirm')
]