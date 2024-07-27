FROM python:3.12.4

# Set labels
LABEL maintainer="hieumdoan@gmail.com"

# Set environment variables
ENV DEVELOPMENT='false'
ENV CONTAINER='true'
ENV LOG_LEVEL='error'
ENV PORT='10000'

RUN python3 -m pip install pipenv

# Instal Python Dependencies
COPY ./main.py main.py
COPY ./models models
COPY ./requirements.txt requirements.txt
RUN python3 -m pip install -r requirements.txt

# Start Application
EXPOSE $PORT

ENTRYPOINT ["python3"]
CMD ["main.py"]
