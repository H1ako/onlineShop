# Generated by Django 4.0.4 on 2022-07-11 16:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('customers', '0016_remove_delivery_quantity_delivery_amount_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cartproduct',
            name='amount',
        ),
    ]
