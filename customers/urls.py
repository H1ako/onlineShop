from django.urls import path
from . import views

urlpatterns = [
    path('', views.CustomerView.as_view()),
    path('notifications', views.notifications),
    path('settings', views.settings),
    path('deliveries', views.DeliveryListView.as_view()),
    path('deliveries/<int:deliveryId>', views.DeliveryView.as_view()),
    path('favourites', views.FavouriteListView.as_view()),
    path('favourites/<int:productId>', views.FavouriteView.as_view()),
    path('cart', views.CartListView.as_view()),
    path('cart/<int:productId>', views.CartView.as_view()),
    path('view-history', views.ViewHistoryView.as_view()),
    path('login', views.loginf)
]
