FROM node:21.6.0 AS frontend-builder

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend .
RUN npm run build

FROM node:21.6.0

WORKDIR /app

COPY --from=frontend-builder /app/frontend/build /app/frontend/build
COPY . .

WORKDIR /app
RUN npm install

EXPOSE 5000

CMD ["npm", "start"]
