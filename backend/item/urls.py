from django.urls import path
from .apis import *

urlpatterns = [
    path('items', ItemAPI.as_view({'get': 'list'}), name='items')
]
