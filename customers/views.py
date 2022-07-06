from django.http import JsonResponse
from customers.serializers import CustomerSerializer, DeliverySerializer, ViewHistorySerializer
from .models import Customer, Cart, Delivery, Notification, Favourite, ViewHistory
from products.models import Product
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from django.views.decorators.csrf import csrf_exempt
# Create your views here.

class CustomerView(APIView):
    def get(self, req):
        customerData = CustomerSerializer(req.user).data
        return Response({'customer': customerData})

class ViewHistoryView(APIView):
    def get(self, req):
        amount = req.GET.get('amount', 'all')

        viewHistorySet = req.user.viewHistory.all().order_by('-viewedAt')

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
            
        
class DeliveriesListView(APIView):
    def get(self, req):
        amount = req.GET.get('amount', 'all')
        deliveries = req.user.deliveries.all().order_by('-arrivalDate')

        if amount != 'all':
            try:
                deliveries = deliveries[:int(amount)]
            except Exception:
                pass

        deliveriesData = DeliverySerializer(deliveries, many=True).data
        return Response({'deliveries': deliveriesData})

class DeliveryView(APIView):
    permission_classes = [IsAuthenticated, ]
    def get(self, req, deliveryId):
        customer = req.user
        delivery = customer.deliveries.filter(id=deliveryId)[0]

        deliveryData = DeliverySerializer(delivery).data
        return Response({'delivery': deliveryData})

    # cancelling
    def patch(self, req, deliveryId):
        customer = req.user
        delivery = customer.deliveries.filter(id=deliveryId)[0]
        if delivery:
            delivery.status = 'CANCELLED'
            delivery.save()

            deliveryData = DeliverySerializer(delivery).data
            return Response({'delivery': deliveryData})

        return Response({'error': 'There are not such a delivery'})


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

@csrf_exempt
def loginf(req):
    if req.method == 'POST':
        customer = Customer.objects.get(email='nikita@yandex.ru')
        if customer is not None:
            login(user=customer, request=req)

        customerData = CustomerSerializer(customer).data
        return JsonResponse({'isAuth': req.user.is_authenticated, 'user': customerData})