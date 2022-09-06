from email.policy import default
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

        # check if set default address and remove the other default if it exists
        if data['defaultAddress']:
            qs = request.user.user_shipping_address.filter(default=True)
            if qs.exists():
                addr = qs[0]
                addr.default = False
                addr.save()

        # check if use default address
        if data['useDefaultAddress']:
            shipping_address = request.user.user_shipping_address.get(default=True)
        else:
            shipping_address = ShippingAddress.objects.create(
                owner = request.user,
                town = data['town'], 
                default = data['defaultAddress']
                # longtitude =
                # latitude =                        
            )

        delivery_plan = DeliveryPlan.objects.get(id=data['delivery'])
        order.shipping_address = shipping_address
        order.delivery_plan = delivery_plan
        order.checkout = True
        order.save()
        return Response({'checkout': order.checkout}, status=status.HTTP_200_OK)

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

class DeliveryPlanAPI(viewsets.ModelViewSet):
    serializer_class = DeliveryPlanSerializer
    queryset = DeliveryPlan.objects.all()

class ShippingAddressAPI(viewsets.ModelViewSet):
    serializer_class = ShippingAddressSerializer
    permission_classes = [IsAuthenticated]

    # check user has default address and return it
    @action(detail=True)
    def get_user_default_address(self, request, format=None):
        address = request.user.user_shipping_address.filter(default=True)
        if address.exists():
            serializer = self.get_serializer(address[0], many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

""" Coinbase payment webhook to verify that payment has been received """

def verify_coinbase_payment():
    pass