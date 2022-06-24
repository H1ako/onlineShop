from rest_framework.views import APIView
from rest_framework.response import Response
from customers.models import ViewHistory
from products.models import Product, Tag, TagCategory

from products.serializers import ProductSerializer, TagCategorySerializer

import random

# Create your views here.

class ProductListView(APIView):
    def get(self, req):
        tagsString = req.GET.get('tags', '')
        amount = req.GET.get('amount', 'all')
        isRandom = req.GET.get('random', False)
        searchQuery = req.GET.get('searchQuery', '')

        if len(tagsString):
            tagList = tagsString.split(',')
            categoriesList = list(TagCategory.objects.filter(tags__name__in=tagList).distinct())

            firstCategoryAskedTagsNames = categoriesList[0].tags.filter(name__in=tagList).values_list('name', flat=True)
            productList = Product.objects.filter(tags__name__in=firstCategoryAskedTagsNames)

            for category in categoriesList[1:]:
                categoryAskedTagsNames = category.tags.filter(name__in=tagList).values_list('name', flat=True)
                productList = productList.filter(tags__name__in=categoryAskedTagsNames)
        else:
            productList = list(Product.objects.all())

        if amount == 'all':
            if isRandom:
                productList = random.sample(productList, len(productList))
        else:
            try:
                if isRandom:
                    productList = random.sample(productList, int(amount))
                else:
                    productList = productList[:int(amount)]
            except Exception:
                pass

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

class CategoryView(APIView):
    def get(self, req):
        categories = TagCategory.objects.all()
        categoriesData = TagCategorySerializer(categories, many=True).data
        return Response({'categories': categoriesData})