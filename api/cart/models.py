from django.db import models
from django.contrib.auth import get_user_model
from item.models import Item

User = get_user_model()

# Create your models here.

class ShippingAddress(models.Model):
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='user_shipping_address', null=True)
    town = models.CharField(default='Nairobi', max_length=100)
    default = models.BooleanField(default=False)
    # longtitude =
    # latitude = 

    def __str__(self):
        return self.town

class DeliveryPlan(models.Model):
    name = models.CharField(max_length=50, unique=True)
    cost = models.PositiveBigIntegerField()
    description = models.TextField()

    def __str__(self):
        return self.name
    

class Payment(models.Model):
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='user_payments', null=True)
    amount = models.PositiveBigIntegerField()
    token = models.CharField(max_length=100)
    received_payment = models.BooleanField(default=False)


    def __str__(self):
        return str(self.owner.email)
    

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
    shipping_address = models.ForeignKey(ShippingAddress, on_delete=models.SET_NULL, related_name='shipping_addres_order', null=True, blank=True)
    payment = models.ForeignKey(Payment, on_delete=models.SET_NULL, related_name='payment_order', null=True, blank=True)
    delivery_plan = models.ForeignKey(DeliveryPlan, on_delete=models.SET_NULL, related_name='delivery_plan_order', null=True, blank=True)
    checkout = models.BooleanField(default=False)

    def __str__(self):
        return self.owner.email
    
    def total_price(self):
        total = 0
        for order_item in self.order_items.all():
            total += order_item.order_item_total_price()
        return total
    
    def total_order_items(self):
        return self.order_items.all().count()