from customers.serializers import CustomerSerializer
from .models import Customer, Cart, Delivery, Notification, Favourite, ViewHistory

# from rest_framework import
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
# Create your views here.

class CustomerView(APIView):
    def get(self, req):
        customerData = CustomerSerializer(req.user).data
        return Response({'customer': customerData})

def notifications():
    pass

def settings():
    pass

def favourites():
    pass

def delivery():
    pass

def cart():
    pass