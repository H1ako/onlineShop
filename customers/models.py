from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from customers.managers import CustomerManager
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from products.models import Product
from phonenumber_field.modelfields import PhoneNumberField
from django.core.validators import MinLengthValidator


class Customer(AbstractBaseUser, PermissionsMixin):
    firstName = models.CharField("First name", max_length=15, blank=True)
    lastName = models.CharField("Last name", max_length=30, blank=True)
    password = models.CharField(max_length=100, validators=[MinLengthValidator(8)])
    email = models.EmailField("Email", unique=True)
    phone = PhoneNumberField(_("Phone"), null=True, blank=True)
    address = models.CharField(
        "Address", max_length=255, null=True, blank=True)
    picture = models.ImageField(
        'Profile Picture', upload_to='profilePictures/', null=True, blank=True)
    is_staff = models.BooleanField('Is Staff Member', default=False)
    is_superuser = models.BooleanField('Is Admin', default=False)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['firstName', 'lastName', 'phone']

    objects = CustomerManager()

    class Meta:
        verbose_name = _('Customer')
        verbose_name_plural = _('Customers')

    def __str__(self):
        return self.email

    def getFullName(self):
        return f"{self.firstName} {self.lastName}"


class CartProduct(models.Model):
    customer = models.ForeignKey(
        Customer, on_delete=models.CASCADE, related_name='cart')
    product = models.ForeignKey(
        Product, on_delete=models.DO_NOTHING, related_name='carts')
    amount = models.PositiveSmallIntegerField('amount', default=1)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    class Meta:
        unique_together = ('customer', 'product')

    def __str__(self):
        return self.product


class Delivery(models.Model):
    STATUS_TYPES = (
        ('DELIVERING', 'delivering'),
        ('DELIVERED', 'delivered'),
        ('CANCELLED', 'cancelled')
    )

    customer = models.ForeignKey(
        Customer, on_delete=models.CASCADE, related_name='deliveries')
    product = models.ForeignKey(
        Product, on_delete=models.DO_NOTHING, related_name='deliveries')
    amount = models.PositiveSmallIntegerField('Amount', default=1)
    address = models.CharField(
        "Delivery Address", max_length=255, null=True, blank=True)
    arrivalDate = models.DateTimeField(
        'will be delivered at', blank=True, null=True)
    status = models.CharField('Status', max_length=100,
                              blank=True, choices=STATUS_TYPES)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    def __str__(self):
        return f'{self.customer} - {self.product}'


class Notification(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    description = models.TextField('Description')
    url = models.CharField('Url', null=True, max_length=255)
    checked = models.BooleanField('Is Checked', default=False)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    def __str__(self):
        return self.description


class Favourite(models.Model):
    customer = models.ForeignKey(
        Customer, on_delete=models.CASCADE, related_name='favourites')
    product = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    class Meta:
        unique_together = ('customer', 'product')

    def __str__(self):
        return f'{self.customer} - {self.product}'


class ViewHistory(models.Model):
    customer = models.ForeignKey(
        Customer, related_name='viewHistory', on_delete=models.CASCADE)
    product = models.ForeignKey(
        Product, related_name='viewHistory', on_delete=models.DO_NOTHING)
    viewedAt = models.DateTimeField(
        "Viewed At", editable=True, auto_now_add=True)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    class Meta:
        unique_together = ('customer', 'product')

    def __str__(self):
        return f"{self.customer} - {self.product}"

    def updateViewedAt(self):
        if self.id:
            self.viewedAt = timezone.now()
        return super(ViewHistory, self).save()
