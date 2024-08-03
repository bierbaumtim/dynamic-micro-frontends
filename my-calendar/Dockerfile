FROM node:22.4.1-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine

EXPOSE 80

COPY --from=builder /app/dist/ /usr/share/nginx/html/
COPY --from=builder /app/dist/main.js /usr/share/nginx/html/my-calendar.js
# COPY --from=builder /app/dist/style.css /usr/share/nginx/html/my-calendar-style.css
COPY ./nginx.conf /etc/nginx/nginx.conf

#CMD ["nginx", "-g", "daemon off;"]