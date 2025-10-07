# from rest_framework import generics
# from rest_framework.permissions import IsAuthenticated
# from .models import Ingredient
# from .serializers import IngredientSerializer

# class IsStaffOrManager(IsAuthenticated):
#     def has_permission(self, request, view):
#         try:
#             return super().has_permission(request, view) and hasattr(request.user, 'profile') and request.user.profile.role in ['staff', 'manager']
#         except AttributeError:
#             return False

# class IngredientListView(generics.ListAPIView):
#     queryset = Ingredient.objects.all()
#     serializer_class = IngredientSerializer
#     permission_classes = [IsStaffOrManager]

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Ingredient
from .serializers import IngredientSerializer

class IsStaffOrManager(IsAuthenticated):
    def has_permission(self, request, view):
        return (super().has_permission(request, view) and 
                hasattr(request.user, 'profile') and 
                request.user.profile.role in ['staff', 'manager'])

class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    permission_classes = [IsStaffOrManager]
