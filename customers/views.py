from django.http import JsonResponse
from customers.serializers import CartProductSerializer, CustomerSerializer, DeliverySerializer, FavouriteSerializer, ViewHistorySerializer
from .models import Customer, ViewHistory
from products.models import Product
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from django.views.decorators.csrf import csrf_exempt
# Create your views here.

class CustomerView(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, req):
        customerData = CustomerSerializer(req.user).data
        return Response({'customer': customerData})

class ViewHistoryView(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, req):
        amount = req.GET.get('amount', 'all')

        viewHistorySet = req.user.viewHistory.all().order_by('-viewedAt')

        if amount != 'all':
            try:
                viewHistorySet = viewHistorySet[:int(amount)]
            except Exception:
                pass

        viewHistoryData = ViewHistorySerializer(viewHistorySet, many=True, context={'request': req}).data
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
            
        
class DeliveryListView(APIView):
    permission_classes = [IsAuthenticated, ]

    # gets customer's deliveries
    def get(self, req):
        amount = req.GET.get('amount', 'all')
        deliveries = req.user.deliveries.all().order_by('-arrivalDate')
        prices = [int(price) for price in list(deliveries.values_list('product__discountPrice', flat=True))]
        pricesSum = sum(prices)

        if amount != 'all':
            try:
                deliveries = deliveries[:int(amount)]
            except Exception:
                pass

        deliveriesData = DeliverySerializer(deliveries, many=True, context={'request': req}).data
        return Response({'deliveries': deliveriesData, 'totalCost': pricesSum})


    def post(self, req):
        product = Product.objects.get(id=9999)
        return Response({'id': product.id})
        # customer = req.user
        # amount = req.POST.get('amount', None)
        # if not amount: return Response({'error': 'no amount'})
        # productId = req.POST.get('productId', None)
        # product = Product.objects.get(id=productId)

        
class DeliveryView(APIView):
    permission_classes = [IsAuthenticated, ]

    # gets customer's delivery by delivery id    
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

            deliveryData = DeliverySerializer(delivery, context={'request': req}).data
            return Response({'delivery': deliveryData})

        return Response({'error': 'There is not such a delivery'})

class FavouriteListView(APIView):
    permission_classes = [IsAuthenticated, ]

    # gets customer's favourites
    def get(self, req):
        amount = req.GET.get('amount', 'all')
        favourites = req.user.favourites.all().order_by('-createdAt')
        prices = [int(price) for price in list(favourites.values_list('product__discountPrice', flat=True))]
        pricesSum = sum(prices)

        if amount != 'all':
            try:
                favourites = favourites[:int(amount)]
            except Exception:
                pass

        favouritesData = FavouriteSerializer(favourites, many=True, context={'request': req}).data
        return Response({'favourites': favouritesData, 'totalCost': pricesSum})

class FavouriteView(APIView):
    permission_classes = [IsAuthenticated, ]

    # gets customer's favourite by product id
    def get(self, req, productId):
        customer = req.user
        favourite = customer.favourites.filter(product__id=productId)[0]

        favouriteData = FavouriteSerializer(favourite, context={'request': req}).data
        return Response({'favourite': favouriteData})

    # adds or removes product from customer's favourites
    def post(self, req, productId):
        customer = req.user

        product = Product.objects.filter(id=productId)[0]
        favourite, created = customer.favourites.get_or_create(product=product)

        if not created:
            favourite.delete()

        return Response({'created': created})


class CartListView(APIView):
    permission_classes = [IsAuthenticated, ]

    # gets customer's cart
    def get(self, req):
        amount = req.GET.get('amount', 'all')
        cart = req.user.cart.all().order_by('-createdAt')
        prices = [int(price) for price in list(cart.values_list('product__discountPrice', flat=True))]
        pricesSum = sum(prices)

        if amount != 'all':
            try:
                cart = cart[:int(amount)]
            except Exception:
                pass

        cartData = CartProductSerializer(cart, many=True, context={'request': req}).data
        return Response({'cartProducts': cartData, 'totalCost': pricesSum})

class CartView(APIView):
    permission_classes = [IsAuthenticated, ]

    # add product to cart or change it's amount
    def post(self, req, productId):
        customer = req.user
        amount = int(req.POST.get('amount', 1))
        if amount < 1: return Response({'error': 'wrong amount'})
        product = Product.objects.filter(id=productId)[0]

        cartProduct, created = customer.cart.get_or_create(product=product, amount=amount)

        if not created:
            cartProduct.amount = amount
            cartProduct.save()

        cartProductData = CartProductSerializer(cartProduct, context={'request': req}).data
        return Response({'cartProduct': cartProduct})

    # remove product from cart
    def delete(self, req, productId):
        customer = req.user
        product = Product.objects.filter(productId)[0]
        cartProduct = customer.cart.get(product=product)

        cartProduct.delete()
        return Response({'result': 'removed from cart'})

    
def notifications():
    pass

def settings():
    pass


def delivery():
    pass


# @csrf_exempt
def loginf(req):
    if req.method == 'POST':
        customer = Customer.objects.get(email='nikita@yandex.ru')
        if customer is not None:
            login(user=customer, request=req)

        customerData = CustomerSerializer(customer).data
        return JsonResponse({'isAuth': req.user.is_authenticated, 'user': customerData})