# Python image as the base
FROM python:3.11-slim

# Set environment variables for non-interactive commands
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file and install dependencies first
# This ensures faster rebuilds if only code changes
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
# This includes all your Django files (manage.py, bms_project folder, etc.)
COPY . .

# Expose the port your Django application will run on (8000)
EXPOSE 8000

# Command to run the application using Gunicorn (a production server)
# The path 'bms_project.wsgi:application' is the standard entry point for Django
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "bms_project.wsgi:application"]