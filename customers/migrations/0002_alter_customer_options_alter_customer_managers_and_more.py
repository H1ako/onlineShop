# Generated by Django 4.0.4 on 2022-06-18 12:09

import customers.managers
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('products', '0002_alter_product_color_alter_product_discount_and_more'),
        ('customers', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='customer',
            options={'verbose_name': 'Customer', 'verbose_name_plural': 'Customers'},
        ),
        migrations.AlterModelManagers(
            name='customer',
            managers=[
                ('objects', customers.managers.CustomerManager()),
            ],
        ),
        migrations.AddField(
            model_name='customer',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups'),
        ),
        migrations.AddField(
            model_name='customer',
            name='is_staff',
            field=models.BooleanField(default=False, verbose_name='Is Staff Member'),
        ),
        migrations.AddField(
            model_name='customer',
            name='is_superuser',
            field=models.BooleanField(default=False, verbose_name='Is Admin'),
        ),
        migrations.AddField(
            model_name='customer',
            name='last_login',
            field=models.DateTimeField(blank=True, null=True, verbose_name='last login'),
        ),
        migrations.AddField(
            model_name='customer',
            name='picture',
            field=models.ImageField(blank=True, null=True, upload_to='profilePictures/', verbose_name='Profile Picture'),
        ),
        migrations.AddField(
            model_name='customer',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions'),
        ),
        migrations.AlterField(
            model_name='customer',
            name='address',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Address'),
        ),
        migrations.AlterField(
            model_name='customer',
            name='email',
            field=models.EmailField(max_length=254, unique=True, verbose_name='Email'),
        ),
        migrations.AlterField(
            model_name='customer',
            name='phone',
            field=models.CharField(blank=True, max_length=20, null=True, verbose_name='Phone'),
        ),
        migrations.CreateModel(
            name='ViewHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('createdAt', models.DateTimeField(auto_now_add=True, verbose_name='Created At')),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='products.product')),
            ],
        ),
    ]
