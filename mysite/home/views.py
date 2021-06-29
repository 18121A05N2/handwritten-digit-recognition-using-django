from django.shortcuts import render

# Create your views here.
def homeFunction(request):
    return render(request,"home.html")