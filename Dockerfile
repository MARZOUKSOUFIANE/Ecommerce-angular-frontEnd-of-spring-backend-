FROM node AS builder

WORKDIR /app

COPY . .

RUN npm install && \
    npm run build --prod

FROM nginx:alpine

COPY --from=builder /app/dist/* /usr/share/nginx/html/