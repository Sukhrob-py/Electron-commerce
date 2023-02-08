from rest_framework.generics import CreateAPIView
from rest_framework import permissions

from .serializers import ProductSerializer
from .models import Product


class CreateProductApiView(CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
