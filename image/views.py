from django.shortcuts import render
from image.serializers import ShopFileSerializer, UserFileSerializer
from rest_framework.views import APIView
from image.models import ShopFile, UserFile
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
# Create your views here.


class ShopFileView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        shopFiles = ShopFile.objects.all()
        serializer = ShopFileSerializer(shopFiles, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        shopFileSerializer = ShopFileSerializer(data=request.data)
        if shopFileSerializer.is_valid():
            shopFileSerializer.save()
            return Response(shopFileSerializer.data, status=status.HTTP_201_CREATED)

        else:
            print('error', shopFileSerializer.errors)
            return Response(shopFileSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
