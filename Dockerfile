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

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80  # Standard HTTP port
CMD ["nginx", "-g", "daemon off;"]