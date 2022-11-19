FROM node:16.17.1-alpine3.15 as build
WORKDIR /app

RUN npm install -g @angular/cli

COPY ./package.json .
RUN yarn
COPY . .
RUN ng build

FROM nginx:alpine as runtime
COPY --from=build /app/dist/front-prueba /usr/share/nginx/html
