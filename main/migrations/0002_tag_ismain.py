# Generated by Django 4.0.4 on 2022-06-13 18:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='tag',
            name='isMain',
            field=models.BooleanField(default=False, verbose_name='Is Main'),
        ),
    ]
