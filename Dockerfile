FROM node:10-alpine

RUN mkdir -p /app

WORKDIR /app

RUN yarn

RUN npm install -g

RUN npm install -g nodemon gulp

RUN npm install gulp 

RUN npm install npm-install-all -g

RUN npm i bundle-collapser

COPY . .

EXPOSE 8080

CMD ["node", "src/index.js"]
