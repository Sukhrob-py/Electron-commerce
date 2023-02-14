from django.db import models
from uuid import uuid4
# Create your models here.

LAPTOP, CAMERA, TABLET, HEADPHONES, PHONE, MOUSE, CONSOLE, OTHER = (
    'laptop',
    'camera',
    'tablet',
    'headphones',
    'phone',
    'mouse',
    'console',
    'other'
)
SAMSUNG, APPLE, LG, SONY, HP, PANASONIC, HUAWEI,XIAOMI,NOKIA,LENOVO, OTHER = (
    'samsung',
    'apple',
    'lg',
    'sony',
    'hp',
    'panasonic',
    'huawei',
    'xiaomi',
    'nokia',
    'lenovo',
    'other'
)

CATEGORY = (
    (LAPTOP, LAPTOP),
    (CAMERA, CAMERA),
    (TABLET, TABLET),
    (HEADPHONES, HEADPHONES),
    (PHONE, PHONE),
    (MOUSE, MOUSE),
    (CONSOLE, CONSOLE),
    (OTHER, OTHER)
)
BRANDS = (
    (SAMSUNG, SAMSUNG),
    (APPLE, APPLE),
    (LG, LG),
    (SONY, SONY),
    (HP, HP),
    (PANASONIC, PANASONIC),
    (HUAWEI, HUAWEI),
    (XIAOMI, XIAOMI),
    (NOKIA, NOKIA),
    (LENOVO, LENOVO),
    (OTHER, OTHER)
)


class Product(models.Model):
    owner = models.ForeignKey('user.User', models.CASCADE, 'products')
    category = models.CharField(max_length=50, choices=CATEGORY, default=OTHER)
    cost = models.CharField(max_length=10, null=True)
    title = models.CharField(max_length=50)
    photo = models.ImageField(upload_to='images/products')
    desc = models.CharField(max_length=255)
    yuid = models.UUIDField(default=uuid4, editable=False, unique=True)
    brand=models.CharField(max_length=50,choices=BRANDS,default=OTHER)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.title
