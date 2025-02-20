FROM python:3.13.2

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY main.py main.py
COPY models models
COPY static static

# Print virtual memory info
RUN free -m || cat /proc/meminfo

# Print disk space info
RUN df -h

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "10000"]
