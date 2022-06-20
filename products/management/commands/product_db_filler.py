from django.core.management.base import BaseCommand, CommandError
from products.models import Product
from django.utils.crypto import get_random_string
import random

class Command(BaseCommand):
    help = 'fill database with products'

    def add_arguments(self, parser):
        parser.add_argument('amount', type=int)
        parser.add_argument('discount', type=int)
        parser.add_argument('brand', type=str)
        parser.add_argument('author', type=str)

    def handle(self, *args, **options):
        amount = options['amount']

        author = options['author']
        brand = options['brand']
        color = 'blue'

        for i in range(amount):
            name = get_random_string(length=16)
            description = get_random_string(length=200)
            price = random.randint(0, 500000)

            discountPrice = price
            if (options['discount'] == 1):
                discountPrice = random.randint(0, price)

            thumbnail = ''
            thumbnailId = random.randint(0, 1)
            if thumbnailId:
                thumbnail = 'productPictures/kros.png'
            else:
                thumbnail = 'productPictures/19-krossovki-adidas-x-raf-simons-ozweego-iii-759x500.jpg'
            
            product = Product.objects.create(
                name=name,
                price=price,
                description=description,
                discountPrice=discountPrice,
                brand=brand,
                color=color,
                author=author,
                thumbnail=thumbnail
            )

            product.save()

        self.stdout.write(self.style.SUCCESS(f'Successfully craeted {amount} products'))