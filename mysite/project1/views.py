import json
from django.http.response import HttpResponse
from .prediction import predict
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt, csrf_protect
# Create your views here.
def index(request):
    return render(request,'project1.html')
@csrf_exempt
def index1(request):
    jsondata = request.body.decode('utf-8')
    jsondata = json.loads(jsondata)
    predjson = json.dumps(predict(jsondata['data']))
    return HttpResponse(str(predjson))
    