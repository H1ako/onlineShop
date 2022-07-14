from django.http import HttpResponseRedirect
from customers.serializers import CustomerSerializer, CustomerSignUpSerializer
from customers.models import Customer
from django.contrib.auth import login, logout, authenticate
from rest_framework.views import APIView
from rest_framework.response import Response


class AuthenticationView(APIView):
    permission_classes = []
    authentication_classes = []

    # log out
    def get(self, req):
        logout(req)

        return HttpResponseRedirect("/")

    # sign up
    def post(self, req):
        # data to update
        serializer = CustomerSignUpSerializer(data=req.data)
        if serializer.is_valid():
            customer = serializer.save()
            login(req, customer)

            customerData = CustomerSerializer(customer).data
            return Response({'customer': customerData, 'result': 'success'})
        return Response({'error': serializer.errors})

    # log in
    def put(self, req):
        password = req.data.get('password', None)
        email = req.data.get('email', None)

        if not email or not password:
            return Response({'error': 'incorrect data'})

        customer = authenticate(req, username=email, password=password)
        if customer is not None:
            login(req, customer)

            customerData = CustomerSerializer(customer).data
            return Response({'customer': customerData, 'result': 'success'})

        return Response({'error': 'wrong password'})
