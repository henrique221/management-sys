FROM node:10-alpine

RUN mkdir -p /app

WORKDIR /app

RUN npm install

RUN npm install -g nodemon gulp

RUN yarn

COPY . .

EXPOSE 8080

CMD ["node", "src/index.js"]

FROM mysql:5.6

COPY setup.sh /mysql/setup.sh
COPY burndown.sql /mysql/burndown.sql
RUN /mysql/setup.sh