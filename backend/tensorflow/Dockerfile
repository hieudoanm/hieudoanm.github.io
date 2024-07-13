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
COPY ./resources/json/dict/languages.json /code/resources/json/dict/languages.json
COPY ./resources/json/list/languages.json /code/resources/json/list/languages.json
COPY ./main.py /code/main.py
EXPOSE $PORT
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "10000"]
