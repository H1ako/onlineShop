# Generated by Django 4.0.4 on 2022-06-30 13:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0007_alter_product_tags_alter_tag_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='location',
            field=models.CharField(blank=True, max_length=255, verbose_name='Location'),
        ),
    ]
