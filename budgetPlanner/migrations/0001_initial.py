# Generated by Django 4.1.7 on 2023-04-03 10:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('trip', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Split',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creation_date', models.DateField(auto_now_add=True)),
                ('amount', models.FloatField(default=0.0)),
                ('tag', models.CharField(choices=[('dining', 'Dining'), ('travel', 'Travel'), ('stay', 'Stay'), ('adventure', 'Adventure'), ('shopping', 'Shopping'), ('others', 'Others')], default='others', max_length=10)),
                ('number_of_debtors', models.IntegerField(default=1)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='trip.user')),
                ('trip', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='trip.trip')),
            ],
        ),
        migrations.CreateModel(
            name='SplitDistribution',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.FloatField(default=0.0)),
                ('paid', models.BooleanField(default=False)),
                ('debtor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='trip.user')),
                ('split', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='budgetPlanner.split')),
            ],
        ),
    ]
