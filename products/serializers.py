from rest_framework import serializers
from .models import Image, Product, Tag, TagCategory


class TagSerializer(serializers.ModelSerializer):
    productsWithTag = serializers.SerializerMethodField()

    class Meta:
        model = Tag
        fields = '__all__'

    def get_productsWithTag(self, tag):
        amount = tag.products.count()
        return amount

class TagCategorySerializer(serializers.ModelSerializer):
    tags = TagSerializer(read_only=True, many=True)

    class Meta:
        model = TagCategory
        fields = '__all__'

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    tags = TagSerializer(read_only=True, many=True)
    images = ImageSerializer(read_only=True, many=True)
    isFavourite = serializers.SerializerMethodField('getIsFavourite')
    inCart = serializers.SerializerMethodField('getInCart')
    
    class Meta:
        model = Product
        fields = '__all__'

    def getIsFavourite(self, product):
        customer = self.context['request'].user
        if not customer: return customer
        favourites = list(customer.favourites.filter(product=product))

        return len(favourites) > 0

    def getInCart(self, product):
        customer = self.context['request'].user
        if not customer: return customer
        cartProduct = customer.cart.filter(product=product)

        if len(cartProduct):
            return cartProduct[0].amount
        else:
            return 0