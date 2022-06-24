from unicodedata import category
from django.db import models
from django.utils import timezone

# Create your models here.

class TagCategory(models.Model):
    name = models.CharField('Name', max_length=50)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    def __str__(self):
        return self.name

    def getUniqueTags(self):
        tags = self.tags.order_by('name').distinct().values('name')

        for tag in tags:
            tag['objects'] = Tag.objects.filter(name=tag['name'])
        
        return tags

class Tag(models.Model):
    category = models.ForeignKey(TagCategory, related_name='tags', on_delete=models.CASCADE, null=True)
    name = models.CharField('Name', max_length=50)
    isMain = models.BooleanField('Is Main', default=False)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    def __str__(self):
        return self.name


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
    tags = models.ManyToManyField(Tag, related_name='products', blank=True)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    def __str__(self):
        return self.name

    def updateTags(self):
        # categories
        authorCategory, created = TagCategory.objects.get_or_create(name='author')
        colorCategory, created = TagCategory.objects.get_or_create(name='color')
        brandCategory, created = TagCategory.objects.get_or_create(name='brand')
        # tags
        authorTag, created = Tag.objects.get_or_create(name=self.author.lower(), category=authorCategory)
        colorTag, created = Tag.objects.get_or_create(name=self.color.lower(), category=colorCategory)
        brandTag, created = Tag.objects.get_or_create(name=self.brand.lower(), category=brandCategory, isMain=True)

        if self.discount > 0:
            priceCategory, created = TagCategory.objects.get_or_create(name='price')
            saleTag, created = Tag.objects.get_or_create(name='sale', category=priceCategory, isMain=True)
            self.tags.add(saleTag)

        self.tags.add(authorTag, colorTag, brandTag)

    def updateTag(self, prevTagName, tagName, categoryName):
        prevTag = Tag.objects.filter(name=prevTagName.lower(), category__name=categoryName.lower()).first()
        if prevTag:
            self.tags.remove(prevTag)

        tagCategory, created = TagCategory.objects.get_or_create(name=categoryName.lower())
        tag, created = Tag.objects.get_or_create(name=tagName.lower(), category=tagCategory)
        self.tags.add(tag)
        
    def save(self, *args, **kwargs):
        if self.id:
            prevProduct = Product.objects.get(id=self.id)

            if self.price != prevProduct.price or self.discountPrice != prevProduct.discountPrice:
                

                if self.discountPrice == self.price:
                    self.discount = 0
                    
                    priceCategory, created = TagCategory.objects.get_or_create(name='price')
                    saleTag = Tag.objects.filter(name='sale', category=priceCategory).first()
                    if saleTag:
                        self.tags.remove(saleTag)
                    
                else:
                    self.discount = 100 - round(self.discountPrice / self.price* 100)
                    priceCategory, created = TagCategory.objects.get_or_create(name='price')
                    saleTag, created = Tag.objects.get_or_create(name='sale', category=priceCategory, isMain=True)
                    self.tags.add(saleTag)

            if self.author.lower() != prevProduct.author.lower():
                self.updateTag(
                    prevTagName=prevProduct.author,
                    tagName=self.author,
                    categoryName='author'
                )

            if self.color.lower() != prevProduct.color.lower():
                self.updateTag(
                    prevTagName=prevProduct.color,
                    tagName=self.color,
                    categoryName='color'
                )

            if self.brand.lower() != prevProduct.brand.lower():
                self.updateTag(
                    prevTagName=prevProduct.brand,
                    tagName=self.brand,
                    categoryName='brand'
                )
        
        super(Product, self).save(*args, **kwargs)

class Image(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField('Image', upload_to='productPictures/')

    def __str__(self):
        return str(self.image)