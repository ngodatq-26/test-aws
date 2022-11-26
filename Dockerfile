FROM node:16-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm i -g pm2 && npm install

COPY . .
CMD ["sh", "-c", "npm run production"]
EXPOSE 5500
