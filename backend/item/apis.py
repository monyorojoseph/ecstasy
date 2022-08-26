from .models import *
from .serializers import *
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

# Create your views here.
class ItemAPI(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

    @action(detail=True)
    def get_item_details(self, request, slug):
        item = get_object_or_404(Item, slug=slug)
        serializer_item = self.get_serializer(item, many=False)
        images = item.item_image.all()
        serializer_images = ItemImagesSerializer(images, many=True)
        data = serializer_item.data
        data["images"] = serializer_images.data
        return Response(data, status=status.HTTP_200_OK)
