FROM node:18.20.2-alpine
LABEL authors="Lucas Guellis"

WORKDIR /app

RUN mkdir node_modules
COPY package*.json /app
RUN npm ci
COPY ./ /app

EXPOSE 8080

CMD ["npm", "run", "dev"]