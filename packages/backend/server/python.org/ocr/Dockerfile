# Use an official Python runtime as a parent image
FROM python:3.13.4

# Set working directory
WORKDIR /app

# Copy requirements.txt and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY main.py main.py
COPY models models
COPY static static

# Print virtual memory info and disk space info
RUN free -m || cat /proc/meminfo && df -h

# Expose the API port
EXPOSE 10000

# Expose the FastAPI app on port 10000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "10000"]
