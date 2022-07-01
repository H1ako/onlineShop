from django.urls import path
from . import views

urlpatterns = [
    path('', views.CustomerView.as_view()),
    path('notifications', views.notifications),
    path('settings', views.settings),
    path('favourites', views.favourites),
    path('deliveries', views.DeliveryView.as_view()),
    path('cart', views.cart),
    path('view-history', views.ViewHistoryView.as_view()),
    path('login', views.loginf)
]
