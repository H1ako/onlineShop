from django.urls import path
from . import views

urlpatterns = [
    path('help', views.helpPage),
    path('search', views.search)
]
