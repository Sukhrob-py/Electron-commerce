from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.core.serializers import serialize
from rest_framework.response import Response

from .models import Cart
from .serializers import CartSerializer


class CartCreateAPiView(CreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Cart.objects.all()
    serializer_class = CartSerializer


class MyCartAPiView(APIView):
    permission_classes=(IsAuthenticated,)
    
    def get(self,request):
        cart=Cart.objects.filter(customer=request.user)
        serialized_cart=serialize('json',cart)
        return Response({
            'data':serialized_cart,
            'customer':self.request.user.username
        })
    
class ClearMyCartApiView(APIView):
    permission_classes=(IsAuthenticated,)

    def post(self,request):
        cart=Cart.objects.filter(customer=request.user)
        cart.delete()
        return Response({
            'message':"deleted!"
        })