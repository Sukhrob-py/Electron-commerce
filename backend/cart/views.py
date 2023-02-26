from rest_framework.generics import CreateAPIView,DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.core.serializers import serialize
from rest_framework.response import Response
import json

from .models import Cart
from products.models import Product
from .serializers import CartSerializer


class CartCreateAPiView(CreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

class MyCartAPiView(APIView):
    permission_classes=(IsAuthenticated,)
    
    def get(self,request):
        cart=Cart.objects.filter(customer=request.user)
        my_cart=[]
        for i in cart:
            prod=Product.objects.get(yuid=i.product_yuid)
            prod_dict={}
            prod_dict['quantity']=i.quantity
            prod_dict['yuid']=str(i.yuid)
            prod_dict['owner']=prod.owner.email
            prod_dict['category']=prod.category
            prod_dict['cost']=prod.cost
            prod_dict['title']=prod.title
            prod_dict['photo']=str(prod.photo)
            print(prod.photo)
            prod_dict['desc']=prod.desc
            prod_dict['brand']=prod.brand
            my_cart.append(prod_dict)

        return Response({
            'data':json.dumps(my_cart),
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
    

class DeleteCartProductApiView(DestroyAPIView):
    permission_classes=(IsAuthenticated,)
    lookup_field="yuid"
    queryset=Cart.objects.all()

    def delete(self, request, *args, **kwargs):
        deleted=super().delete(request, *args, **kwargs)
        return Response({
            "deleted":True
        })