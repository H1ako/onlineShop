import re
from rest_framework.views import APIView
from rest_framework.response import Response
from customers.models import ViewHistory
from products.models import Product, Tag, TagCategory
from django.db.models import Q

from products.serializers import ProductSerializer, TagCategorySerializer

import random

# Create your views here.

class ProductListView(APIView):
    def get(self, req):
        pageSize = 10
        tagsString = req.GET.get('tags', '')
        amount = req.GET.get('amount', 'all')
        isRandom = req.GET.get('random', False)
        searchQuery = req.GET.get('searchQuery', '')
        page = int(req.GET.get('page', 1))

        def getTagsDictFromStr(tagsString):
            rawTagDict = list(e.split(' : ') for e in tagsString.split(','))
            tagDict = {}

            for categoryAndTag in rawTagDict:
                category = categoryAndTag[0]
                tag = categoryAndTag[1]

                if category in tagDict.keys():
                    tagDict[category].append(tag)
                else:
                    tagDict[category] = [tag]

            # e.g. [{'price': ['sale']}]
            return tagDict

        if len(tagsString):
            tagDict = getTagsDictFromStr(tagsString)

            # e.g. [{'price': ['sale']}] -----> [['price', ['sale']]]
            # for slicing in the loop
            categoryAndTagsList = list(tagDict.items())
            
            tagsIds = Tag.objects.filter(category__name=categoryAndTagsList[0][0], name__in=categoryAndTagsList[0][1]).values_list('id', flat=True)
            productList = Product.objects.filter(tags__id__in=tagsIds)

            for category, tags in categoryAndTagsList[1:]:
                tagsIds = Tag.objects.filter(category__name=category, name__in=tags).values_list('id', flat=True)
                productList = productList.filter(tags__id__in=tagsIds)
        else:
            productList = Product.objects.all()

        if len(searchQuery):
            searchQuerySeparated = re.split(r'\W+', searchQuery)

            inTagsName = Q(tags__name__icontains=searchQuery)
            inName = Q()
            inDesc = Q()
            for queryWord in searchQuerySeparated:
                inName |= Q(name__icontains=queryWord)
                inDesc |= Q(description__icontains=queryWord)

            productList = list(productList.filter(inName | inDesc | inTagsName).distinct())


        if amount == 'all':
            if isRandom:
                productList = random.sample(productList, len(productList))
        else:
            try:
                if isRandom:
                    productList = random.sample(productList, min(int(amount), len(productList)))
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