from django.urls import path
from .views import (CreateProductApiView, FilterProductsApiView, ProductListApiView,
                    FilterByCategory, FilterByBrandApiView, MyProductListApiView, MyProductsDetailApiView,
                    ProductDetailApiView,PopularProductsListApiView,QuantityOfCategoryProductsApiView)

urlpatterns = [
    path('create/', CreateProductApiView.as_view(), name='create_product'),
    path('filter/', FilterProductsApiView.as_view(), name='filtered_products'),
    path('products/', ProductListApiView.as_view(), name='products'),
    path('populars/', PopularProductsListApiView.as_view(), name='popular_products'),
    path('quantity_category/', QuantityOfCategoryProductsApiView.as_view(), name='quantity_products_category'),
    path('products/<str:yuid>', ProductDetailApiView.as_view(), name='product_detail'),
    path('filter_category/', FilterByCategory.as_view(), name='filtered_category'),
    path('filter_brand/', FilterByBrandApiView.as_view(), name='filtered_brand'),
    path('myproducts/', MyProductListApiView.as_view(), name='myproducts'),
    path('myproducts/<str:yuid>', MyProductsDetailApiView.as_view(),
         name='myproducts_detail'),
]
