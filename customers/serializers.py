from email.policy import default
from rest_framework import serializers
from .models import CartProduct, Customer, Delivery, Favourite, ViewHistory
from products.serializers import ProductSerializer
from django.core.validators import MinLengthValidator


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'firstName', 'lastName', 'email',
                  'is_staff', 'phone', 'address', 'picture']


class CustomerUpdateSerializer(serializers.ModelSerializer):
    oldPassword = serializers.CharField(max_length=100, validators=[
                                        MinLengthValidator(8)], required=False)
    newPassword = serializers.CharField(max_length=100, validators=[
                                        MinLengthValidator(8)], required=False)
    newPasswordAgain = serializers.CharField(
        max_length=100, validators=[MinLengthValidator(8)], required=False)

    class Meta:
        model = Customer
        fields = ['id', 'firstName', 'lastName', 'email', 'is_staff', 'phone',
                  'address', 'picture', 'oldPassword', 'newPassword', 'newPasswordAgain']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def update(self, customer, data):
        try:
            if data['oldPassword']:
                customer.set_password(data['newPassword'])
        except KeyError:
            pass

        customer.email = data.get('email', customer.email)
        customer.phone = data.get('phone', customer.phone)
        customer.address = data.get('address', customer.address)
        customer.firstName = data.get('firstName', customer.firstName)
        customer.lastName = data.get('lastName', customer.lastName)
        customer.picture = data.get('picture', customer.picture)
        customer.save()

        return customer

    def validate(self, data):
        try:
            if self.instance.check_password(data['oldPassword']):
                if data['newPassword'] != data['newPasswordAgain']:
                    raise serializers.ValidationError(
                        "new passwords shoud be similar")
            else:
                raise serializers.ValidationError("wrong password")
        except KeyError:
            pass

        return data


class CustomerSignUpSerializer(serializers.ModelSerializer):
    passwordAgain = serializers.CharField(max_length=100, validators=[
                                          MinLengthValidator(8)], required=True)
    password = serializers.CharField(max_length=100, validators=[
                                     MinLengthValidator(8)], required=True)

    class Meta:
        model = Customer
        fields = ['id', 'firstName', 'lastName', 'email', 'is_staff',
                  'phone', 'address', 'picture', 'passwordAgain', 'password']

    def create(self, data):
        # new customer data
        firstName = data.get('firstName', 'Blue')
        lastName = data.get('firstName', 'User')
        address = data.get('address', '')
        phone = data.get('phone', None)
        email = data.get('email', '')
        picture = data.get('picture', None)
        password = data.get('password', '12345678')

        newCustomer = Customer.objects.create(
            address=address, firstName=firstName, lastName=lastName, phone=phone, email=email, picture=picture)
        newCustomer.set_password(password)
        newCustomer.save()

        return newCustomer

    def validate(self, data):
        try:
            if data['password'] != data['passwordAgain']:
                raise serializers.ValidationError("passwords shoud be similar")
        except KeyError:
            raise serializers.ValidationError("password is missing")
        return data


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


class FavouriteSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Favourite
        fields = '__all__'


class CartProductSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = CartProduct
        fields = '__all__'
