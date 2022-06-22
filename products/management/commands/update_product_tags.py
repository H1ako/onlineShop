from django.core.management.base import BaseCommand, CommandError
from products.models import Product
from django.utils.crypto import get_random_string
import random

class Command(BaseCommand):
    help = 'update products tags: brand, author, color'

    def handle(self, *args, **options):
        products = Product.objects.all()

        for product in products:
            product.updateTags()

        self.stdout.write(self.style.SUCCESS(f'Successfully updated'))