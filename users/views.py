from django.shortcuts import render
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import serializers
from .models import User
import bcrypt

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims (role)
        token['role'] = user.role
        return token

    def validate(self, attrs):
        # Get username and password from request
        username = attrs.get('username')
        password = attrs.get('password')

        # Find user
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise serializers.ValidationError('Invalid username or password')

        # Verify password (assuming bcrypt hashing)
        if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            raise serializers.ValidationError('Invalid username or password')

        # Prepare token data
        data = super().validate(attrs)
        data['role'] = user.role  # Include role in response
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer