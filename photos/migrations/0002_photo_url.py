# Generated by Django 4.1.7 on 2023-04-14 12:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='photo',
            name='url',
            field=models.CharField(default='', max_length=200),
        ),
    ]