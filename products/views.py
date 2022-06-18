from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from products.models import Product

from products.serializers import ProductSerializer

# Create your views here.

class ProductListView(ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()[:6]

class ProductView(APIView):
    def get(self, req, productId):
        product = Product.objects.get(id=productId)
        productData = ProductSerializer(product).data
        
        return Response({'product': productData})