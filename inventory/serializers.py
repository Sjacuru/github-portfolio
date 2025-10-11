from rest_framework import serializers
from .models import Ingredient

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'stock_quantity', 'unit', 'reorder_point']
        read_only_fields = ['created_by']
