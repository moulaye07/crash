FROM node:latest

WORKDIR /api

RUN apt update && apt install nano

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8001
