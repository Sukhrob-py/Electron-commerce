# Generated by Django 4.1.7 on 2023-02-24 07:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_product_created_at_product_updated_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='photo',
            field=models.ImageField(blank=True, null=True, upload_to='images/products'),
        ),
    ]