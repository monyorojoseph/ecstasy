from rest_framework import serializers
from .models import *

class ItemSerializer(serializers.ModelSerializer):
    cover_image = serializers.SerializerMethodField()
    class Meta:
        model = Item
        fields = "__all__"
    def get_cover_image(self, obj):
        return obj.item_image.all()[0].image.url

class ItemImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemImages
        fields = "__all__"

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"