
# Old code that uses a custom User model
# from django.db import models

# class User(models.Model):
#     username = models.CharField(max_length=50, unique=True)
#     password = models.CharField(max_length=255)
#     role = models.CharField(max_length=10, choices=[('manager', 'Manager'), ('staff', 'Staff')])

#     class Meta:
#         db_table = 'Users'

from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=[('manager', 'Manager'), ('staff', 'Staff'), ('customer', 'Customer')], default='customer')

    def __str__(self):
        return f"{self.user.username} - {self.role}"
    
    class Meta:
        db_table = 'user_profiles'        