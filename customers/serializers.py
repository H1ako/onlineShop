from rest_framework import serializers
from .models import Customer, Delivery, ViewHistory
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

class DeliverySerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    status = serializers.SerializerMethodField('getStatus')
    
    class Meta:
        model = Delivery
        fields = '__all__'
    
    def getStatus(self, delivery):
        return delivery.get_status_display()