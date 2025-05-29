# 1. Use Node base image
FROM node:18-alpine AS builder

# 2. Set working directory
WORKDIR /app

# 3. Copy package files and install dependencies
COPY .env .env
COPY package*.json ./
RUN npm install

# 4. Copy all files and build the project
COPY . .
RUN npm run build

# 5. Use a lightweight server to serve the app
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000

CMD ["npm", "start"]
