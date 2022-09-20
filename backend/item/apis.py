from .models import *
from .serializers import *
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

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


# review api
""" 
Performs : 
    1. Posting review
    2. Deleting review
"""
class ReviewAPI(viewsets.ViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [ IsAuthenticated ]

    # posting review
    @action(detail=True, methods=['POST'])
    def post_review(self, request, format=None):
        data = request.data
        review = Review.objects.create(
            item = get_object_or_404(Item, slug=data['slug']),
            owner = request.user,
            comment = data['comment']
        )
        serializer = self.get_serializer(review, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    # delete review
    @action(detail=False, methods=['DELETE'])
    def remove_review(self, request, id, format=None):
        review =  request.user.user_review.get(id=id)
        review.delete()
        return Response({'detail': 'Review removed'}, status=status.HTTP_200_OK)