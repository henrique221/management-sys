FROM node:10-alpine

RUN mkdir -p /app

WORKDIR /app

RUN npm install nodemon -g

RUN yarn

COPY . .

EXPOSE 8080

CMD ["node", "src/index.js"]
