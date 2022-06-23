from django.urls import path
from . import views

urlpatterns = [
    path('', views.ProductListView.as_view()),
    path('<int:productId>', views.ProductView.as_view()),
    path('categories', views.CategoryView.as_view())
]