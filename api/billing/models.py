from django.db import models

class Subscription(models.Model):
    name = models.CharField(max_length=100)
    price = models.PositiveIntegerField()

    def __str__(self) -> str:
        return self.name
