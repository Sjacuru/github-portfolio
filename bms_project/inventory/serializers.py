from rest_framework import serializers
from bms_project.inventory.models import Ingredient, ProductionBatch

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'stock_quantity', 'unit', 'reorder_point', 'created_at', 'updated_at', 'last_updated_by']
        read_only_fields = ['created_by']

class ProductionBatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductionBatch
        fields = ['id', 'product_name', 'quantity_produced', 'production_date', 'created_by', 'updated_at', 'last_updated_by', 'status']
        read_only_fields = ['production_date', 'created_by', 'updated_at', 'last_updated_by', 'status']

    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].user
        validated_data['last_updated_by'] = self.context['request'].user
        return super().create(validated_data)
    
class LowStockIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['name', 'stock_quantity', 'reorder_point']
    