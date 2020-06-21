#stage 1
FROM node:latest AS node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/employeeapp/ /usr/share/nginx/html

# used by: docker build --pull --name employeeapp --rm -f "Dockerfile" -t employeeapp:latest "."