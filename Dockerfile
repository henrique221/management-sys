FROM node:10-alpine

RUN mkdir -p /app

WORKDIR /app

RUN npm install

RUN npm install -g nodemon gulp

RUN npm install gulp 

RUN yarn

RUN npm-install-all gulpfile.js

COPY . .

EXPOSE 8080

CMD ["node", "src/index.js"]
