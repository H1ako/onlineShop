from django.http import HttpResponseRedirect
from customers.serializers import CustomerSerializer
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
        address = req.data.get('address', None)
        firstName = req.data.get('firstName', None)
        lastName = req.data.get('lastName', None)
        password = req.data.get('password', None)
        passwordAgain = req.data.get('passwordAgain', None)
        phone = req.data.get('phone', None)
        email = req.data.get('email', None)
        picture = req.FILES.get('picture', None)

        # updates password
        if password != None and email != None:
            passwordsAreSimilars = password == passwordAgain

            if passwordsAreSimilars:
                customer = Customer.objects.create(
                    address=address, firstName=firstName, lastName=lastName, phone=phone, email=email, picture=picture)
                customer.set_password(password)
                customer.save()

                login(req, customer)

                customerData = CustomerSerializer(customer).data
                return Response({'customer': customerData, 'result': 'success'})

            return Response({'error': 'passwords are not similar'})

        return Response({'error': 'email or phone is incorrect'})

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
