FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache openssl
COPY server/package*.json ./
RUN npm ci --omit=dev
COPY server/ ./
RUN npx prisma generate
EXPOSE 5000
CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]
