FROM node:11.6.0-alpine AS builder
COPY . ./employeeapp
WORKDIR /employeeapp
RUN npm i
RUN $(npm bin)/ng build --prod

FROM nginx:1.15.8-alpine
COPY --from=builder /employeeapp/dist/employeeapp/ /usr/share/nginx/html