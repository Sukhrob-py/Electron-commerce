from django.urls import path

from .views import CartCreateAPiView, MyCartAPiView,ClearMyCartApiView

urlpatterns = [
    path('create/', CartCreateAPiView.as_view(), name='create_cart'),
    path('mycart/', MyCartAPiView.as_view(), name='mycart'),
    path('clear/', ClearMyCartApiView.as_view(), name='clear_mycart'),
]
