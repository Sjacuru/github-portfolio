from django.db import models

class User(models.Model):
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=255)
    role = models.CharField(max_length=10, choices=[('manager', 'Manager'), ('staff', 'Staff')])

    class Meta:
        db_table = 'Users'