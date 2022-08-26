from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from item.models import Item
from .serializers import *
from .models import *

# Create your views here.
class OrderItemAPI(viewsets.ModelViewSet):
    serializer_class = OrderItemSerialzer
    permission_classes = [IsAuthenticated]    

    @action(detail=False)
    def my_order_items(self, request, format=None):
        print('Hey')
        order_items = request.user.user_order_items.filter(ordered=False)
        serializer = self.get_serializer(order_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=["POST"])
    def add_order_item(self, request, format=None):
        data = request.data
        order_item, created = OrderItem.objects.get_or_create(
            owner = request.user, ordered = False, item = get_object_or_404(Item, slug=data['slug'])
        )

        orders = request.user.user_orders.filter(ordered=False)

        if orders:
            orders = orders[0]
            if orders.order_items.filter(order_items=order_item):
                order_item.quantity += 1
            orders.order_items.set(order_item)
        else:
            Order.objects.create(order_items = order_item)
        
        return Response(status=status.HTTP_200_OK)