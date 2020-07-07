from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()
# Create your models here.


class Manufacturer(models.Model):
    name = models.CharField(max_length=120)
    address = models.CharField(max_length=120, blank=True, null=True)
    phone = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.name


class BaseDisc(models.Model):
    name = models.CharField(max_length=120)
    speed = models.FloatField(blank=True, null=True)
    glide = models.FloatField(blank=True, null=True)
    turn = models.FloatField(blank=True, null=True)
    fade = models.FloatField(blank=True, null=True)
    manufacturer = models.ForeignKey(Manufacturer, on_delete=models.CASCADE, related_name='discs')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['speed']
    

class Disc(BaseDisc):
    # represents an individual disc
    weight = models.FloatField(blank=True, null=True)
    primary_color = models.CharField(max_length=120, blank=True, null=True)
    secondary_color = models.CharField(max_length=120, blank=True, null=True)
    condition = models.IntegerField(blank=True, null=True)
    plastic = models.ForeignKey('Plastic', on_delete=models.SET_NULL, blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name='discs')
    public = models.BooleanField(default=False)
    fortrade = models.BooleanField(default=False)
    forsale = models.BooleanField(default=False)



class Plastic(models.Model):
    manufacturer = models.ForeignKey(Manufacturer, on_delete=models.CASCADE, related_name='plastic')
    name = models.CharField(max_length=80)
    description = models.TextField(blank=True, null=True)


class Inventory(models.Model):
    #  add through model
    pass


class Bag(models.Model):
    name = models.CharField(max_length=80, blank=True, null=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name='bags')
    description = models.TextField(blank=True, null=True)
    discs = models.ManyToManyField(Disc)


