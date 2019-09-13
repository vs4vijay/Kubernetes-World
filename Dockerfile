FROM node:10.10.0-alpine

WORKDIR /app

COPY . ./

RUN npm install

ENV APP_PORT=9999

EXPOSE 9999

CMD ["node", "app.js"]