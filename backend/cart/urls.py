from os import remove
from django.urls import path
from .apis import *

urlpatterns = [
    path('my-order-items', OrderItemAPI.as_view({'get': 'my_order_items'}), name='my_order_items'),
    path('add-order-item', OrderItemAPI.as_view({'post': 'add_order_item'}), name='add_order_item'),
    path('remove-order-item', OrderItemAPI.as_view({'post': 'remove_order_item'}), name='remove_order_item'),
    path("get-order-item", OrderItemAPI.as_view({'post': 'get_order_item'}), name="get_order_item"),
    path('total-order-items', OrderAPI.as_view({'get':'order_item_total'}), name='order_item_total'),
    path('my-order', OrderAPI.as_view({'get': 'my_order'}), name='my_order')
]
