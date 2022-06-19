from customers.serializers import CustomerSerializer, ViewHistorySerializer
from .models import Customer, Cart, Delivery, Notification, Favourite, ViewHistory, ViewHistory
from products.models import Product

from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
# Create your views here.

class CustomerView(APIView):
    def get(self, req):
        customerData = CustomerSerializer(req.user).data
        return Response({'customer': customerData})

class ViewHistoryView(APIView):
    def get(self, req):
        amount = req.GET.get('amount', 'all')

        viewHistorySet = req.user.viewHistory.all()

        if amount != 'all':
            try:
                viewHistorySet = viewHistorySet[:int(amount)]
            except Exception:
                pass

        viewHistoryData = ViewHistorySerializer(viewHistorySet, many=True).data

        return Response({'viewHistory': viewHistoryData})
    
    def post(self, req):
        productId = req.POST.get('productId', 'Error')
        product = Product.objects.get(id=productId)

        if not product:
            return Response({'detailed': 'ERROR: Incorrect product id'}, status=HTTP_400_BAD_REQUEST)

        viewHistory, created = ViewHistory.objects.get_or_create(product=product, customer=req.user)

        if not created:
            viewHistory.updateViewedAt()

        if not viewHistory:
            return Response({'detailed': 'ERROR: view history was not created or updated'}, status=HTTP_400_BAD_REQUEST)
        
        return Response(status=HTTP_200_OK)
            
        
        


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

def loginf(req):
    if req.method == 'GET':
        customer = Customer.objects.get(email='nikita@yandex.ru')
        if customer is not None:
            login(customer, req)