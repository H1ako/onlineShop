from django.db import models

from products.models import Product

# Create your models here.

class Customer(models.Model):
    firstName = models.CharField("First name", max_length=50)
    lastName = models.CharField("Last name", max_length=50)
    password = models.CharField(max_length=100)
    email = models.EmailField("Email")
    phone = models.CharField("Phone", max_length=20)
    address = models.CharField("Address", max_length=255)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    def __str__(self):
        return self.firstName

class Cart(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    quantity = models.PositiveSmallIntegerField('Quantity')
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    def __str__(self):
        return self.product

class Delivery(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    quantity = models.PositiveSmallIntegerField('Quantity')
    delivered = models.BooleanField('Is Delivered', default=False)
    deliveredAt = models.DateTimeField("Will be Delivered At")
    createdAt = models.DateTimeField("Created At", auto_now_add=True)
    
    def __str__(self):
        return self.product

class Notification(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    description = models.TextField('Description')
    url = models.CharField('Url', null=True, max_length=255)
    checked = models.BooleanField('Is Checked', default=False)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)
    
    def __str__(self):
        return self.description

class Favourite(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)
    
    def __str__(self):
        return self.product

class ViewHistory(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)
    
    def __str__(self):
        return self.product