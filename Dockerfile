FROM node:10-alpine

RUN mkdir -p /app

WORKDIR /app

RUN npm install

RUN npm install -g nodemon gulp

RUN yarn

COPY . .

EXPOSE 8080

CMD ["node", "src/index.js"]
