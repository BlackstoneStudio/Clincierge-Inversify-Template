FROM node:16-alpine

ARG NODE_ENV=production

ARG BUILD_CONTEXT 

ARG BUILD_PORT $BUILD_PORT

ENV NODE_ENV $NODE_ENV

WORKDIR /home/node/app

COPY package.json .

COPY yarn.lock .

COPY ./package.json ./

RUN yarn --frozen-lock

COPY ./ ./

EXPOSE $BUILD_PORT

WORKDIR /home/node/app/

USER node

CMD ["yarn", "start"]
