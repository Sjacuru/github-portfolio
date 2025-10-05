from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import serializers
from django.contrib.auth.models import User
from users.models import Profile


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        try:
            profile = Profile.objects.get(user=user)
            token['role'] = profile.role
        except Profile.DoesNotExist:
            token['role'] = None
        return token


    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        try:
            profile = Profile.objects.get(user=user)
            data['role'] = profile.role
        except Profile.DoesNotExist:
            data['role'] = None
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer