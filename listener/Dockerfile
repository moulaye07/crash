FROM python:3.10

WORKDIR /listener

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python3" "./listener.py" ]


