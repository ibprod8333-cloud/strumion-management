# Stage 1: build
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

RUN ls -la dist/ && test -f dist/main.js

# Stage 2: production
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev --frozen-lockfile #npm install --production --frozen-lockfile


COPY --from=builder /app/dist ./dist


EXPOSE 3000
CMD ["node", "dist/main.js"]