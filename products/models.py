from django.db import models

# Create your models here.

class Product(models.Model):
    name = models.CharField('Name', max_length=50)
    description = models.TextField(max_length=200)
    brand = models.CharField('Brand', max_length=50)
    thumbnail = models.ImageField('Thumbnail', upload_to='productPictures/')
    author = models.CharField('Author', max_length=60)
    price = models.PositiveIntegerField('Price')
    discount = models.IntegerField('Discount', null=True, default=0)
    discountPrice = models.PositiveIntegerField('Price with Discount', null=True)
    color = models.CharField('Color', max_length=50)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    def __str__(self):
        return self.name