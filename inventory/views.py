from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated
from .models import Ingredient
from .serializers import IngredientSerializer

class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    permission_classes = [IsAuthenticated]

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