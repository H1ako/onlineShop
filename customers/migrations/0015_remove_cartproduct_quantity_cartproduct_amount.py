# Generated by Django 4.0.4 on 2022-07-08 16:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customers', '0014_alter_cartproduct_customer'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cartproduct',
            name='quantity',
        ),
        migrations.AddField(
            model_name='cartproduct',
            name='amount',
            field=models.PositiveSmallIntegerField(default=1, verbose_name='amount'),
        ),
    ]
