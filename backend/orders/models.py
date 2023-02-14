from django.db import models
from uuid import uuid4
# Create your models here.


class Order(models.Model):
    customer=models.ForeignKey('user.User',on_delete=models.CASCADE)
    product_yuid=models.CharField(max_length=50)
    quantity=models.PositiveSmallIntegerField()
    yuid=models.UUIDField(default=uuid4,editable=False,unique=True)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.customer.username