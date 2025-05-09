# Use an official Python runtime as a parent image
FROM python:3.13.4-alpine

# Set working directory
WORKDIR /app

# Copy requirements
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy main
COPY main.py .

# Print virtual memory info and disk space info
RUN free -m || cat /proc/meminfo && df -h

# Expose the API port
EXPOSE 10000

# Run the FastAPI app with Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "10000"]
