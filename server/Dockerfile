FROM node:18-slim
LABEL authors="Lucas Guellis"

WORKDIR /app

COPY package.json /app
RUN npm install
ENV NODE_ENV production
COPY ./ /app

CMD ["npm", "run", "start"]