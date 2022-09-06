from rest_framework import serializers
from .models import *

class OrderItemSerialzer(serializers.ModelSerializer):
    cover_image = serializers.SerializerMethodField()
    item_total_price = serializers.SerializerMethodField()
    class Meta:
        model = OrderItem
        fields = ['ordered', 'id', 'item', 'quantity', 'cover_image', 'item_total_price']
        depth = 1
    
    def get_cover_image(self, obj):
        return obj.item.item_image.all()[0].image.url
    
    def get_item_total_price(self, obj):
        return obj.order_item_total_price()

class OrderSerializer(serializers.ModelSerializer):
    total_price = serializers.SerializerMethodField()
    class Meta:
        model = Order
        fields = ['ordered', 'order_items', 'total_price', 'payment', 'checkout', 'shipping_address']
    
    def get_total_price(self, obj):
        return obj.total_price()   

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = "__all__"

class DeliveryPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryPlan
        fields = "__all__"