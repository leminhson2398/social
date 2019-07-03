from rest_framework import serializers
from image.models import ShopFile, UserFile


class ShopFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopFile
        fields = '__all__'


class UserFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFile
        fields = '__all__'
