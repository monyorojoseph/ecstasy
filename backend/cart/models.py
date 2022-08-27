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
        return str(self.item.name)
    
    def order_item_total_price(self):
        return self.quantity * self.item.price
    
class Order(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_orders')
    order_items = models.ManyToManyField(OrderItem)
    ordered = models.BooleanField(default=False)

    def __str__(self):
        return self.owner.email
    
    def total_price(self):
        total = 0
        for order_item in self.order_items.all():
            total += order_item.order_item_total_price()
        return total
    
    def total_order_items(self):
        total = 0
        for order_item in self.order_items.all():
            total += order_item.quantity
        return total
