from django.urls import path, include
from rest_framework.routers import DefaultRouter
from bms_project.inventory.views import IngredientViewSet, ProductionBatchViewSet

router = DefaultRouter()
router.register(r'ingredients', IngredientViewSet, basename='ingredient')
router.register(r'production-batches', ProductionBatchViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('ingredients/low-stock/', IngredientViewSet.as_action('low_stock'), name='low-stock'),
]