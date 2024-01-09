FROM node:20 AS build

LABEL author="hieudoanm"
LABEL maintainer="hieumdoan@gmail.com"
LABEL version="1.0"

ENV PORT=8080

RUN mkdir /home/node/app
WORKDIR /home/node/app

COPY . /home/node/app

RUN yarn install
RUN yarn build

FROM node:20.10-alpine

USER node

COPY --from=build /home/node/app ./

EXPOSE $PORT

CMD ["yarn", "start"]
