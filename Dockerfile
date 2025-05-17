# Build stage
FROM node:18.20.4-alpine AS builder
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache postgresql-client

# Copy dependency files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy all source files
COPY . .

# Build the application
RUN npx vite build

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config if you have one
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose your port
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]