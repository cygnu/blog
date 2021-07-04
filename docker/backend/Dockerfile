FROM python:3.8-buster As builder
ENV PYTHONDONTWRITEBYTECODE 1 \
    PYTHONUNBUFFERED 1

RUN mkdir -p /build/backend
WORKDIR /build/backend

COPY requirements.txt .

RUN pip install --upgrade pip && \
    pip install -r requirements.txt


FROM python:3.8-slim-buster As runner
ENV PYTHONDONTWRITEBYTECODE 1 \
    PYTHONUNBUFFERED 1

COPY --from=builder /usr/local/lib/python3.8/site-packages /usr/local/lib/python3.8/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

RUN apt update && \
    apt install -y libpq5 libxml2 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    mkdir -p /work/backend
WORKDIR /work/backend

COPY . .
