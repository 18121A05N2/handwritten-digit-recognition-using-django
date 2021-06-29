from django.urls import path
from . import views

urlpatterns = [
    path("",views.homeFunction,name='home')
]