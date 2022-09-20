from django.db import models
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
class Category(models.Model):
    name = models.CharField(unique=True, max_length=50)

    def __str__(self) -> str:
        return self.name
    
    class Meta:
        verbose_name_plural = 'Categories'

class Item(models.Model):
    name = models.CharField(max_length=100)
    price = models.PositiveIntegerField()
    category = models.ManyToManyField(Category, related_name='item_category', blank=True)
    details = models.TextField()
    # add highlight descritpion
    slug = models.CharField(unique=True, max_length=100, null=True, blank=True)
    
    def __str__(self) -> str:
        return self.name

class ItemImages(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='item_image')
    image = ProcessedImageField(
        upload_to='item', processors=[ResizeToFill(500, 500)],
        format='JPEG', options={'quality': 90}
    )

    def __str__(self):
        return str(self.item.name)
    
    class Meta:
        verbose_name_plural = 'ItemImages'
    
class Review(models.Model):
    item = models.ForeignKey(Item, on_delete=models.SET_NULL, null=True, related_name='item_review')
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='user_review')
    comment = models.TextField()
    posted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.item.name)  