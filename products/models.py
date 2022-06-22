from itertools import product
from math import prod
from django.db import models
from django.utils import timezone
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

    def updateTags(self):
        authorTag, created = Tag.objects.get_or_create(product=self, name=self.author)
        brandTag, created = Tag.objects.get_or_create(product=self, name=self.brand, isMain=True)
        colorTag, created = Tag.objects.get_or_create(product=self, name=self.color)

        if self.discount > 0:
            saleTag, created = Tag.objects.get_or_create(product=self, name='sale', isMain=True)


    def save(self, *args, **kwargs):
        if self.id:
            prevProduct = Product.objects.get(id=self.id)

            if prevProduct.author != self.author:
                # object or null
                authorTag = Tag.objects.filter(product=self, name=prevProduct.author).first()

                if authorTag:
                    authorTag.name = self.author
                    authorTag.save()
                else:
                    newAuthorTag = Tag.objects.create(product=self, name=self.author)
            
            if prevProduct.color != self.color:
                # object or null
                colorTag = Tag.objects.filter(product=self, name=prevProduct.color).first()

                if colorTag:
                    colorTag.name = self.color
                    colorTag.save()
                else:
                    newColorTag = Tag.objects.create(product=self, name=self.color)

            if prevProduct.brand != self.brand:
                # object or null
                brandTag = Tag.objects.filter(product=self, name=prevProduct.brand).first()

                if brandTag:
                    brandTag.name = self.brand
                    brandTag.isMain = True
                    brandTag.save()
                else:
                    newBrandTag = Tag.objects.create(product=self, name=self.brand, isMain=True)

            if self.discountPrice == self.price:
                if self.discount > 0:
                    self.discount = 0

                # object or null
                saleTag = Tag.objects.filter(product=self, name='sale').first()
                if saleTag:
                    saleTag.delete()
            else:
                self.discount = 100 - round(self.discountPrice / self.price * 100)

                if self.discount:
                    saleTag, saleTagCreated = Tag.objects.get_or_create(product=self, name='sale')
        
        super(Product, self).save(*args, **kwargs)

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