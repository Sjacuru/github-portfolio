#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import django


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bms_project.settings')
    django.setup()
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. It must be installed and "
            "available on your PYTHONPATH environment variable."
            "Check if it is activated on a virtual environment"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
