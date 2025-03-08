FROM python:3.13

# Install Stockfish engine
RUN apt-get update && apt-get install -y stockfish && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy files
COPY requirements.txt .
COPY main.py .
COPY config.json .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the FastAPI app on port 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
