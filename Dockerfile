FROM ubuntu:16.04

RUN apt-get update -y && \
    apt-get install -y python-pip python-dev

RUN apt-get install python-psycopg2 -y

WORKDIR /chat_app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY app app
COPY migrations migrations
COPY run_app.py .env config.py ./

ENV FLASK_APP run_app.py
RUN flask db upgrade

EXPOSE 5000
ENTRYPOINT ["python"]
CMD ["run_app.py"]
