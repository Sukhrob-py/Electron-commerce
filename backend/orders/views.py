from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.core.serializers import serialize
from rest_framework.response import Response

from .models import Order
from .serializers import OrderSerializer

class OrderCreateApiView(CreateAPIView):
    permission_classes=(IsAuthenticated,)
    serializer_class=OrderSerializer
    queryset=Order.objects.all()