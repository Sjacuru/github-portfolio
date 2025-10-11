from django.db import models
from django.contrib.auth.models import User

class Ingredient(models.Model):
    name = models.CharField(max_length=100, unique=True)
    stock_quantity = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    unit = models.CharField(
        max_length=20,
        choices=[('kg', 'Kilograms'), ('g', 'Grams'), ('l', 'Liters'), ('unit', 'Units')],
        default='kg',
        reorder_point = models.FloatField(),
        created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    )
    reorder_point = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)  # For BMS-13
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_updated_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True
    ) 

    def __str__(self):
        return f"{self.name} ({self.stock_quantity} {self.unit})"