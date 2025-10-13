from django.db import models
from django.contrib.auth.models import User

class Ingredient(models.Model):
    name = models.CharField(max_length=100, unique=True)
    stock_quantity = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    unit = models.CharField(
        max_length=20,
        choices=[('kg', 'Kilograms'), ('g', 'Grams'), ('l', 'Liters'), ('unit', 'Units')],
        default='kg'
    )
    created_by = models.ForeignKey(User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='created_ingredients')
    reorder_point = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)  # For BMS-13
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_updated_by = models.ForeignKey(User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='updated_ingredients'
    ) 
    def __str__(self):
        return f"{self.name} ({self.stock_quantity} {self.unit})"
    
class ProductionBatch(models.Model):
    product_name = models.CharField(max_length=100)
    quantity_produced = models.DecimalField(max_digits=10, decimal_places=2)
    production_date = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='created_batches')
    updated_at = models.DateTimeField(auto_now=True)
    last_updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='updated_batches')
    status = models.CharField(max_length=20, choices=[  
        ('pending', 'Pending'), 
        ('completed', 'Completed')
        ], default='completed') # After include this feature run migrations and update serializer and viewset accordingly, also curl commands



    def __str__(self):
        return f"Batch of {self.product_name} - {self.quantity_produced} units on {self.production_date.strftime('%Y-%m-%d')}"
    