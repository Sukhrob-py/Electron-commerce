from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView
from rest_framework import permissions
from rest_framework.views import APIView
from django.core.serializers import serialize
from rest_framework.response import Response

from .serializers import ProductSerializer
from .models import Product


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


class FilterByCategory(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        category = request.data.get('category')
        products = Product.objects.filter(category=category)
        serialized_products = serialize('json', products)
        return Response({
            'data': serialized_products
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

    def get_queryset(self):
        queryset = Product.objects.filter(owner=self.request.user)
        return queryset
