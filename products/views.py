from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from customers.models import ViewHistory
from products.models import Product, Tag

from products.serializers import ProductSerializer

import random

# Create your views here.

class ProductListView(APIView):
    def get(self, req):
        tagsString = req.GET.get('tags', '')
        amount = req.GET.get('amount', 'all')
        isRandom = req.GET.get('random', False)

        if len(tagsString):
            tagList = tagsString.split(',')

            productList = list(Product.objects.filter(tags__name=tagList[0]))
            for tag in tagList[1:]:
                productList = productList.filter(tags__name=tag)
        else:
            productList = list(Product.objects.all())

        if amount != 'all':
            try:
                if isRandom != False:
                    productList = random.sample(productList, int(amount))
                else:
                    productList = productList[:int(amount)]

            except Exception:
                pass
        else:
            productList = random.sample(productList, len(productList))

        productsData = ProductSerializer(productList, many=True).data
        return Response({'products': productsData})

class ProductView(APIView):
    def get(self, req, productId):
        product = Product.objects.get(id=productId)
        productData = ProductSerializer(product).data

        if req.user:
            viewHistory, created = ViewHistory.objects.get_or_create(customer=req.user, product=product)

            if not created:
                viewHistory.updateViewedAt()
        
        return Response({'product': productData})