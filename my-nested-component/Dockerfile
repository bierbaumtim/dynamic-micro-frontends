FROM node:22.4.1-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine

EXPOSE 80

COPY --from=builder /app/dist/my-nested-component/3rdpartylicenses.txt /usr/share/nginx/html
# COPY --from=builder /app/dist/my-nested-component/browser/index.html /usr/share/nginx/html
COPY --from=builder /app/dist/my-nested-component/browser/main.js /usr/share/nginx/html
# COPY --from=builder /app/dist/my-nested-component/browser/styles.css /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf