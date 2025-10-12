from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from users.models import Profile

class Command(BaseCommand):
    help = 'Create a new user in auth_user with a profile'

    def add_arguments(self, parser):
        parser.add_argument('username', type=str, help='Username')
        parser.add_argument('password', type=str, help='Password')
        parser.add_argument('role', type=str, help='Role (manager or staff)')

    def handle(self, *args, **options):
        username = options['username']
        password = options['password']
        role = options['role']

        if role not in ['manager', 'staff']:
            self.stdout.write(self.style.ERROR('Role must be "manager" or "staff"'))
            return

        if User.objects.filter(username=username).exists():
            self.stdout.write(self.style.ERROR(f'Username {username} already exists'))
            return

        user = User.objects.create_user(username=username, password=password)
        Profile.objects.create(user=user, role=role)
        self.stdout.write(self.style.SUCCESS(f'Successfully created user {username} with role {role}'))