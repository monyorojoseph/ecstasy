from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from item.models import Item
from .serializers import *
from .models import *

class OrderItemAPI(viewsets.ModelViewSet):
    serializer_class = OrderItemSerialzer
    permission_classes = [IsAuthenticated]    

    @action(detail=False)
    def my_order_items(self, request, format=None):
        order_items = request.user.user_order_items.filter(ordered=False)
        serializer = self.get_serializer(order_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=["POST"])
    def add_order_item(self, request, format=None):
        data = request.data
        item = get_object_or_404(Item, slug=data['slug'])
        order_item, created = OrderItem.objects.get_or_create(
            owner = request.user, ordered = False, item = item
        )
        order_qs = request.user.user_orders.filter(ordered=False)
        if order_qs.exists():
            order= order_qs[0]
            if order.order_items.filter(item__slug=item.slug).exists():
                order_item.quantity += 1
                order_item.save()
                serializer = self.get_serializer(order_item, many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                order.order_items.add(order_item)    
                serializer = self.get_serializer(order_item, many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            order = Order.objects.create(owner=request.user)
            order.order_items.add(order_item)        
            serializer = self.get_serializer(order_item, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['POST'])
    def remove_order_item(self, request, format=None):
        data = request.data
        item = get_object_or_404(Item, slug=data['slug'])
        order_qs = request.user.user_orders.filter(ordered=False)
        if order_qs.exists():
            order = order_qs[0]
            order_item = request.user.user_order_items.filter(item=item, ordered=False)[0]
            if order.order_items.filter(item__slug=item.slug).exists():
                if order_item.quantity > 1:
                    order_item.quantity -= 1
                    order_item.save()
                    serializer = self.get_serializer(order_item, many=False)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:                        
                    order.order_items.remove(order_item)
                    order_item.delete()
                    return Response({"detail":"Removed Successfully"}, status=status.HTTP_200_OK)
            return Response({"detail":"Not in your cart"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"details": "Your cart is empty"}, status=status.HTTP_404_NOT_FOUND)
    
    # check if order item exist or not
    @action(detail=True, methods=['POST'])
    def get_order_item(self, request, format=None):
        item = get_object_or_404(Item, slug=request.data['slug'])        
        order_item = request.user.user_order_items.filter(item=item, ordered=False)
        if order_item.exists():
            serializer = self.get_serializer(order_item[0], many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

    


class OrderAPI(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    
    @action(detail=True)
    def my_order(self, request, format=None):
        order_qs = request.user.user_orders.filter(ordered=False)
        serializer = self.get_serializer(order_qs[0], many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False)
    def order_item_total(self, request, format=None):
        order_qs = request.user.user_orders.filter(ordered=False)
        total =order_qs[0].total_order_items()
        return Response({'total': total}, status=status.HTTP_200_OK)
    
    # checkout
    """ user adds shipping address to the order """
    @action(detail=False, methods=['POST'])
    def checkout(self, request, format=None):
        data = request.data
        order = request.user.user_orders.get(ordered=False)
        shipping_address = ShippingAddress.objects.create(
            owner = request.user,
            town = data['town'], 
            # longtitude =
            # latitude =                        
        )
        delivery_plan = DeliveryPlan.objects.get(name=data['delivery_plan'])
        order.shipping_address.add(shipping_address)
        order.delivery_plan.add(delivery_plan)
        order.checkout = True
        order.save()
        return Response({'detail': 'Shipping address and delivery plan saved'}, status=status.HTTP_200_OK)

    # payment
    """ user confirms payment for the order"""
    @action(detail=False, methods=['POST'])
    def payment(self, request, format=None):
        data = request.data
        order = request.user.user_orders.get(ordered=False)
        payment = Payment.objects.create(
            owner = request.user,
            amount = order.total_price() + order.delivery_plan.cost,
            token = data['token'],
            received_payment = False           
        )
        order.payment = payment
        order.order_items.update(ordered=True)
        for order_item in order.order_items.all():
            order_item.save()
        order.ordered = True
        order.save()
        return Response({'detail': 'Order made succesfully'}, status=status.HTTP_200_OK)

""" Coinbase payment webhook to verify that payment has been received """

def verify_coinbase_payment():
    pass