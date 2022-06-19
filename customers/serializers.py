from rest_framework import serializers
from .models import Customer, ViewHistory
from products.serializers import ProductSerializer

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'firstName', 'lastName', 'email', 'is_staff', 'phone', 'address', 'picture']

class ViewHistorySerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    
    class Meta:
        model = ViewHistory
        fields = '__all__'