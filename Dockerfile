# base image
FROM node:12 AS builder
# default to prod build
ARG REACT_APP_ENV=production
# set working directory
WORKDIR /app
# install dependencies
COPY package*.json ./
RUN npm install
# copying source files
COPY . .
# building app
RUN npm run build:$REACT_APP_ENV

FROM node:alpine
# set working directory
WORKDIR /app 
COPY --from=builder . .
COPY package* ./
RUN npm install --production
CMD npm start