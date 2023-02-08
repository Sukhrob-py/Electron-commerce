from django.urls import path
from .views import CreateProductApiView

urlpatterns=[
    path('create/',CreateProductApiView.as_view(),name='create_product')
]