from django.urls import path
from . import views

urlpatterns = [
    path('', views.AuthenticationView.as_view()),
]
