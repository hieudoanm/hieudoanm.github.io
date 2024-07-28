FROM python:3.12

# Set labels
LABEL maintainer="hieumdoan@gmail.com"

# Set environment variables
ENV DEVELOPMENT='false'
ENV CONTAINER='true'
ENV LOG_LEVEL='error'
ENV PORT='10000'

# Instal Python Dependencies
WORKDIR /code
COPY ./requirements.txt /code/requirements.txt
RUN python3 -m pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Start Application
COPY ./main.py /code/main.py
EXPOSE $PORT
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "10000", "--loop", "asyncio"]
