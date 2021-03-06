# Generated by Django 2.1.3 on 2020-07-07 21:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Bag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=80, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('owner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='bags', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='BaseDisc',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('speed', models.FloatField(blank=True, null=True)),
                ('glide', models.FloatField(blank=True, null=True)),
                ('turn', models.FloatField(blank=True, null=True)),
                ('fade', models.FloatField(blank=True, null=True)),
            ],
            options={
                'ordering': ['speed'],
            },
        ),
        migrations.CreateModel(
            name='Inventory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Manufacturer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('address', models.CharField(blank=True, max_length=120, null=True)),
                ('phone', models.IntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Plastic',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=80)),
                ('description', models.TextField(blank=True, null=True)),
                ('manufacturer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='plastic', to='bag.Manufacturer')),
            ],
        ),
        migrations.CreateModel(
            name='Disc',
            fields=[
                ('basedisc_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='bag.BaseDisc')),
                ('weight', models.FloatField(blank=True, null=True)),
                ('primary_color', models.CharField(blank=True, max_length=120, null=True)),
                ('secondary_color', models.CharField(blank=True, max_length=120, null=True)),
                ('condition', models.IntegerField(blank=True, null=True)),
                ('notes', models.TextField(blank=True, null=True)),
                ('public', models.BooleanField(default=False)),
                ('fortrade', models.BooleanField(default=False)),
                ('forsale', models.BooleanField(default=False)),
                ('owner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='discs', to=settings.AUTH_USER_MODEL)),
                ('plastic', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='bag.Plastic')),
            ],
            bases=('bag.basedisc',),
        ),
        migrations.AddField(
            model_name='basedisc',
            name='manufacturer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='discs', to='bag.Manufacturer'),
        ),
        migrations.AddField(
            model_name='bag',
            name='discs',
            field=models.ManyToManyField(to='bag.Disc'),
        ),
    ]
