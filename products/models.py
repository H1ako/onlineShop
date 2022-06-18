from django.db import models

# Create your models here.

class Product(models.Model):
    name = models.CharField('Name', max_length=50)
    description = models.TextField(max_length=200)
    brand = models.CharField('Brand', max_length=50)
    thumbnail = models.ImageField('Thumbnail', upload_to='productPictures/')
    author = models.CharField('Author', max_length=60)
    price = models.PositiveIntegerField('Price')
    discount = models.IntegerField('Discount', null=True, blank=True, default=0)
    discountPrice = models.PositiveIntegerField('Price with Discount', null=True, blank=True)
    color = models.CharField('Color', max_length=50, null=True, blank=True)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    def __str__(self):
        return self.name

class Tag(models.Model):
    product = models.ForeignKey(Product, related_name='tags', on_delete=models.CASCADE)
    name = models.CharField('Name', max_length=50)
    isMain = models.BooleanField('Is Main', default=False)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    def __str__(self):
        return self.name

class Image(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField('Image', upload_to='productPictures/')

    def __str__(self):
        return str(self.image)