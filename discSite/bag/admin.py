from django.contrib import admin
from bag import models



class BaseAdmin(admin.ModelAdmin):
    list_display = ('name', 'speed', 'glide', 'turn', 'fade', 'manufacturer')


class DiscAdmin(admin.ModelAdmin):
    list_display = ('weight', 'condition', 'plastic', 'notes', 'owner')


class PlasticAdmin(admin.ModelAdmin):
    list_display = ('manufacturer', 'name')


class MfgAdmin(admin.ModelAdmin):
    list_display = ('name',)


# Register your models here.
admin.site.register(models.BaseDisc, BaseAdmin)
admin.site.register(models.Manufacturer, MfgAdmin)
admin.site.register(models.Plastic, PlasticAdmin)
admin.site.register(models.Disc, DiscAdmin)
