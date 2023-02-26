from django.urls import path

from .views import CartCreateAPiView, MyCartAPiView,ClearMyCartApiView,DeleteCartProductApiView

urlpatterns = [
    path('create/', CartCreateAPiView.as_view(), name='create_cart'),
    path('mycart/', MyCartAPiView.as_view(), name='mycart'),
    path('clear/', ClearMyCartApiView.as_view(), name='clear_mycart'),
    path('delete/<str:yuid>', DeleteCartProductApiView.as_view(), name='delete_prod'),
]
