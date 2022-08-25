from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

# user serializers
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"