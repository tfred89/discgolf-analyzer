from django.db import models

# Create your models here.
class Disc(models.Model):
    name = models.CharField(max_length=120)
    speed = models.FloatField(blank=True, null=True)
    glide = models.FloatField(blank=True, null=True)
    turn = models.FloatField(blank=True, null=True)
    fade = models.FloatField(blank=True, null=True)
    manufacturer = models.ForeignKey('Manufacturer', on_delete=models.CASCADE, related_name='mfg')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['speed']
    

class Manufacturer(models.Model):
    name = models.CharField(max_length=120)
    address = models.CharField(max_length=120, blank=True, null=True)
    phone = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.name


class Plastic(models.Model):
    manufacturer = models.ForeignKey(Manufacturer, on_delete=models.CASCADE, related_name='mfg')
    name = models.CharField(max_length=80)
    description = models.TextField()

