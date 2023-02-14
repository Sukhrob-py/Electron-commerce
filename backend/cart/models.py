from django.db import models
from uuid import uuid4
from products.models import Product
# Create your models here.


class Cart(models.Model):
    yuid = models.UUIDField(default=uuid4, editable=False, unique=True)
    product_yuid = models.CharField(max_length=100)
    customer = models.ForeignKey('user.User', on_delete=models.CASCADE)
    quantity = models.PositiveSmallIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.customer.username
