FROM python:3.12

# Set labels
LABEL maintainer="hieumdoan@gmail.com"

# Set environment variables
ENV DEVELOPMENT='false'
ENV CONTAINER='true'
ENV LOG_LEVEL='error'
ENV PORT='10000'

# Install Stockfish
RUN apt-get update && apt upgrade -y && apt install scid stockfish -y && rm -rf /var/lib/apt/lists/*
RUN /usr/games/stockfish help

# Instal Python Dependencies
WORKDIR /code
COPY ./requirements.txt /code/requirements.txt
RUN python3 -m pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy Chess Openings
COPY ./resources/chess/openings/json/dict/openings.json /code/resources/chess/openings/json/dict/openings.json
COPY ./resources/chess/openings/json/list/openings.json /code/resources/chess/openings/json/list/openings.json

# Copy Models
COPY ./models/label.pkl /code/models/label.pkl
COPY ./models/model.pkl /code/models/model.pkl
COPY ./models/vector.pkl /code/models/vector.pkl


# Start Application
COPY ./main.py /code/main.py
EXPOSE $PORT
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "10000", "--loop", "asyncio"]
