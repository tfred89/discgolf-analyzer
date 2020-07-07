from rest_framework import serializers
from bag.models import BaseDisc, Disc, Manufacturer, Plastic, Bag


class BaseDiscSerializer(serializers.ModelSerializer):
    manufacturer = serializers.StringRelatedField()

    class Meta:
        model = BaseDisc
        fields = '__all__'