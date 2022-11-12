# from django.template.defaultfilters import slugify
# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from .models import Item

# # create slug for every item
# @receiver(post_save, sender=Item)
# def create_item_slug(sender, instance, created, *args, **kwargs):
#     if created:
#         instance.slug = slugify(f"{instance.name} {instance.id}")
#         instance.save()