from django.urls import path
from .apis import *

urlpatterns = [
    path('my-order-items', OrderItemAPI.as_view({'get': 'my_order_items'}), name='my_order_items'),
    path('add-order-item', OrderItemAPI.as_view({'post': 'add_order_item'}), name='add_order_item')
]
