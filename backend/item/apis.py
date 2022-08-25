from .models import *
from .serializers import *
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

# Create your views here.
class ItemAPI(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()
