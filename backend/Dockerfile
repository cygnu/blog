FROM python:3.9

ENV PYTHONDONTWRITEBYTECODE 1\
    PYTHONBUFFERED 1

RUN mkdir -p /work/backend
WORKDIR /work/backend

COPY requirements.txt .

RUN pip install --upgrade pip && \
    pip install -r requirements.txt

COPY . .