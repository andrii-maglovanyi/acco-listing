FROM node:12-alpine AS base
WORKDIR /usr/src/app
COPY . .
RUN yarn
EXPOSE 3000
CMD yarn start:dev
