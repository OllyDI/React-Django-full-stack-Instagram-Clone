FROM node:19-alpine3.16

RUN apk add --no-cache python3 py3-pip
RUN apk add --no-cache postgresql-dev gcc python3-dev musl-dev
RUN apk add --no-cache jpeg-dev zlib-dev

RUN ln -sf python3 /usr/bin/python

WORKDIR /code
COPY requirements-dev.txt .
RUN pip install -r requirements-dev.txt

ENTRYPOINT [ "ash" ]

# 원래는 백엔드, 프론트엔드 두개의 컨테이너가 필요함