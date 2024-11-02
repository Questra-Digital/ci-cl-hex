FROM node:20.17.0 AS dev

WORKDIR /app

COPY ./package.json ./yarn.lock ./

RUN yarn install

CMD [ "yarn", "dev"]