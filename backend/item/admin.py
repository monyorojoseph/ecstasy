from django.contrib import admin
from .models import Item, Category, ItemImages
# Register your models here.

admin.site.register(ItemImages)
admin.site.register(Item)
admin.site.register(Category)
