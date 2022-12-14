from os import remove
from django.urls import path
from .apis import *

urlpatterns = [
    path('my-order-items', OrderItemAPI.as_view({'get': 'my_order_items'}), name='my_order_items'),
    path('add-order-item', OrderItemAPI.as_view({'post': 'add_order_item'}), name='add_order_item'),
    path('remove-order-item', OrderItemAPI.as_view({'post': 'remove_order_item'}), name='remove_order_item'),
    path("get-order-item", OrderItemAPI.as_view({'post': 'get_order_item'}), name="get_order_item"),
    path('total-order-items', OrderAPI.as_view({'get':'order_item_total'}), name='order_item_total'),
    path('my-order', OrderAPI.as_view({'get': 'my_order'}), name='my_order'),
    path('checkout', OrderAPI.as_view({'post': 'checkout'}), name='checkout'),
    path('payment', OrderAPI.as_view({'post': 'payment'}), name='payment'),
    path('delivery-plans', DeliveryPlanAPI.as_view({'get': 'list'}), name='delivery_plans'),
    path('default-address', ShippingAddressAPI.as_view({'get': 'get_user_default_address'}), name='get_user_default_address')
]
