from django.db import models
from django.contrib.auth import get_user_model
from item.models import Item

User = get_user_model()

# Create your models here.

class OrderItem(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_order_items')
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    ordered = models.BooleanField(default=False)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return str(self.owner.email)
    
class Order(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_orders')
    order_items = models.ManyToManyField(OrderItem)
    ordered = models.BooleanField(default=False)

    def __str__(self):
        return self.owner.email