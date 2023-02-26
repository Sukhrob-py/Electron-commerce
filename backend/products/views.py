from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView
from rest_framework import permissions
from rest_framework.views import APIView
from django.core.serializers import serialize
from rest_framework.response import Response
import json

from .serializers import ProductSerializer
from .models import Product, CATEGORY


class CreateProductApiView(CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class FilterProductsApiView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        name = request.data.get('name')
        products = Product.objects.filter(title__contains=name)
        serialized_products = serialize('json', products)
        return Response({
            'data': serialized_products
        })


class QuantityOfCategoryProductsApiView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        category_quantity = []
        category_quantity.append({'all': Product.objects.all().count()})
        for i in CATEGORY:
            quantity_dic = {}
            quantity = Product.objects.filter(category=i[0]).count()
            quantity_dic[i[0]] = quantity

            category_quantity.append(quantity_dic)
        return Response({
            'data': json.dumps(category_quantity)
        })


class FilterByCategory(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        category = request.data.get('category')
        if category == 'all':
            products = Product.objects.all()
        else:
            products = Product.objects.filter(category=category.lower())
        products_list = []
        for i in products:
            prod_dict = {}
            prod_dict['yuid'] = str(i.yuid)
            prod_dict['owner'] = i.owner.email
            prod_dict['category'] = i.category
            prod_dict['cost'] = i.cost
            prod_dict['title'] = i.title
            prod_dict['photo'] = "http://127.0.0.1:8000/media/"+str(i.photo)
            prod_dict['desc'] = i.desc
            prod_dict['brand'] = i.brand
            products_list.append(prod_dict)
        return Response({
            'data': json.dumps(products_list)
        })


class FilterByBrandApiView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        brand = request.data.get('brand')
        products = Product.objects.filter(brand=brand)
        serialized_products = serialize('json', products)
        return Response({
            'data': serialized_products
        })


class ProductListApiView(ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class PopularProductsListApiView(ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Product.objects.all()[:20]
    serializer_class = ProductSerializer


class ProductDetailApiView(RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = "yuid"


class MyProductListApiView(ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.filter(owner=self.request.user)
        return queryset


class MyProductsDetailApiView(RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ProductSerializer
    lookup_field = 'yuid'

    def delete(self, request, *args, **kwargs):
        deleted = super().delete(request, *args, **kwargs)
        return Response({
            'status': 204
        })

    def get_queryset(self):
        queryset = Product.objects.filter(owner=self.request.user)
        return queryset

    def put(self, request, *args, **kwargs):
        print("-----------------")
        print(request.data)
        print("---------+++++++++")
        updated = super().put(request, *args, **kwargs)
        return Response({
            "updated": True
        })
