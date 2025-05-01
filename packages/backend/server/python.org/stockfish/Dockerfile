# Use an official Python runtime as a parent image
FROM python:3.13.4

# Install Stockfish engine
RUN apt-get update && apt-get install -y stockfish && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy files and Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY main.py .
COPY config.json .

# Print virtual memory info and disk space info
RUN free -m || cat /proc/meminfo && df -h

# Expose the API port
EXPOSE 10000

# Expose the FastAPI app on port 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "10000"]
