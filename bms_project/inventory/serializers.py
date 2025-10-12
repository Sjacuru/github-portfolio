from rest_framework import serializers
from bms_project.inventory.models import Ingredient

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'stock_quantity', 'unit', 'reorder_point', 'created_at', 'updated_at', 'last_updated_by']
        read_only_fields = ['created_by']
