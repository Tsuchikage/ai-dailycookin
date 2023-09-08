FROM python:3.11

WORKDIR /src

ADD  /src/requirements.txt /

RUN apt -y update && apt -y install libgl1

RUN pip3 install -r /requirements.txt

ADD /src /src