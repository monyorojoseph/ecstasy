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
        fields = ['ordererd', 'order_items', 'total_price']
    
    def get_total_price(self, obj):
        return obj.total_price()   