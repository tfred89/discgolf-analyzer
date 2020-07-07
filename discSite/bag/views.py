from django.shortcuts import render
from rest_framework import viewsets
from bag.serializers import BaseDiscSerializer
from bag.models import BaseDisc

# Create your views here.

class BaseDiscView(viewsets.ModelViewSet):
    serializer_class = BaseDiscSerializer
    queryset = BaseDisc.objects.all()