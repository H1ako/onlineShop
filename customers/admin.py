from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Customer)
admin.site.register(CartProduct)
admin.site.register(Delivery)
admin.site.register(Notification)
admin.site.register(Favourite)
admin.site.register(ViewHistory)