from rest_framework import filters, viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import F
from rest_framework.permissions import IsAuthenticated 
from .models import Ingredient, ProductionBatch
from .serializers import IngredientSerializer, ProductionBatchSerializer

class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'], url_path='low-stock')
    def low_stock(self, request):
        low_stock = Ingredient.objects.filter(stock_quantity__lt=F('reorder_point'))
        serializer = self.get_serializer(low_stock, many=True)
        return Response(serializer.data)

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), IsStaffOrManager()]
        return [IsAuthenticated()]

class IsStaffOrManager(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        # Allow users with is_staff = True or role = 'manager'/'staff'
        if request.user.is_staff:
            return True
        try:
            return request.user.profile.role in ['manager', 'staff']
        except AttributeError:  # Profile or role doesn't exist
            return False
        
class ProductionBatchViewSet(viewsets.ModelViewSet):
    queryset = ProductionBatch.objects.all().order_by('-production_date')
    serializer_class = ProductionBatchSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['product_name']
    ordering_fields = ['production_date', 'quantity_produced']