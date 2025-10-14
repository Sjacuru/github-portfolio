from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import IngredientViewSet, ProductionBatchViewSet

router = DefaultRouter()
router.register(r'ingredients', IngredientViewSet, basename='ingredient')
router.register(r'production-batches', ProductionBatchViewSet, basename = 'production-batch')

urlpatterns = [
    path('', include(router.urls)),
]