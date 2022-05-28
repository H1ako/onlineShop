from django.db import models

from products.models import Product

# Create your models here.

class Tag(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    name = models.CharField('Name', max_length=50)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    def __str__(self):
        return self.name

class Image(models.Model):
    name = models.CharField('Name', max_length=255)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/')

    def __str__(self):
        return self.image