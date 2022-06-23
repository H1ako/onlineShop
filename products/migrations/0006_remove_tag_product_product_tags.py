# Generated by Django 4.0.4 on 2022-06-23 14:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0005_tagcategory_tag_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tag',
            name='product',
        ),
        migrations.AddField(
            model_name='product',
            name='tags',
            field=models.ManyToManyField(related_name='products', to='products.tag'),
        ),
    ]
