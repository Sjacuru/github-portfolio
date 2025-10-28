from rest_framework import filters, viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import F
from rest_framework.permissions import IsAuthenticated
from .models import Ingredient, ProductionBatch
from .serializers import IngredientSerializer, ProductionBatchSerializer, LowStockIngredientSerializer

# Custom permission to allow only staff or managers to modify data
class IsStaffOrManager(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        if request.user.is_staff:
            return True
        # avoid attribute errors if profile or role is missing
        try:
            return getattr(request.user, "profile", None) and request.user.profile.role in ['manager', 'staff']
        except Exception:
            return False

class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['stock_quantity']

    @action(detail=False, methods=['get'], url_path='low-stock', permission_classes=[IsAuthenticated, IsStaffOrManager])
    def low_stock(self, request):
        low_stock = self.get_queryset().filter(stock_quantity__lte=F('reorder_point'))
        serializer = LowStockIngredientSerializer(low_stock, many=True)
        return Response(serializer.data)

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), IsStaffOrManager()]
        return [IsAuthenticated()]
        
class ProductionBatchViewSet(viewsets.ModelViewSet):
    queryset = ProductionBatch.objects.all().order_by('-production_date')
    serializer_class = ProductionBatchSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['product_name']
    ordering_fields = ['production_date', 'quantity_produced']