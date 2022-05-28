from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('notifications', views.notifications),
    path('settings', views.settings),
    path('favourites', views.favourites),
    path('delivery', views.delivery),
    path('cart', views.cart),
]
