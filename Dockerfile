FROM node:22 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build
RUN npm run lint && npm run test 

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/dist .
COPY --from=build /app/server/nginx.conf /etc/nginx/conf.d/default.conf 
ENTRYPOINT ["nginx", "-g", "daemon off;"]
