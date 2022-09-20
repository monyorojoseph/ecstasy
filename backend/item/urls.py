from django.urls import path
from .apis import *

urlpatterns = [
    path('items', ItemAPI.as_view({'get': 'list'}), name='items'),
    path('item-details/<str:slug>', ItemAPI.as_view({'get': 'get_item_details'}), name='item_details'),
    
]
