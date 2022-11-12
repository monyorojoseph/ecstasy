from django.contrib import admin
from .models import Item, Category, ItemImages, Review
# Register your models here.

admin.site.register(ItemImages)
admin.site.register(Item)
admin.site.register(Category)
admin.site.register(Review)