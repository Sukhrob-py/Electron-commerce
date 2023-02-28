from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView
from rest_framework import permissions
from rest_framework.views import APIView
from django.core.serializers import serialize
from django.http import JsonResponse
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
        name = self.request.data.get('name')
        queryset = Product.objects.filter(
            title__contains=name).exclude(owner=self.request.user)
        return JsonResponse(serialize("json", queryset), safe=False)




class QuantityOfCategoryProductsApiView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        category_quantity = []
        category_quantity.append(
            {'all': Product.objects.all().exclude(owner=request.user).count()})
        for i in CATEGORY:
            quantity_dic = {}
            quantity = Product.objects.filter(
                category=i[0]).exclude(owner=request.user).count()
            quantity_dic[i[0]] = quantity

            category_quantity.append(quantity_dic)
        return Response({
            'data': json.dumps(category_quantity)
        })


class FilterByCategory(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        category = self.request.data.get('category')
        if category == "all":
            queryset = Product.objects.all().exclude(owner=self.request.user)
        else:
            queryset = Product.objects.filter(
                category=category).exclude(owner=self.request.user)
        return JsonResponse(serialize("json", queryset), safe=False)


class FilterByBrandApiView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        brand = request.data.get('brand')
        products = Product.objects.filter(brand=brand)
        serialized_products = serialize('json', products)
        return Response({
            'data': serialized_products
        })


class ProductListApiView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        queryset = Product.objects.all().exclude(owner=self.request.user)
        return JsonResponse(serialize("json", queryset), safe=False)


class PopularProductsListApiView(ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        queryset = Product.objects.all().exclude(owner=self.request.user)[:20]
        return JsonResponse(serialize("json", queryset), safe=False)


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
        updated = super().put(request, *args, **kwargs)
        return Response({
            "updated": True
        })
