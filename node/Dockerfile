FROM node:15

WORKDIR /usr/src/app

COPY . .

RUN node install express && node install mysql


EXPOSE 3000

CMD [ "node", "index.js" ]