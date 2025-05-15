FROM node:24-alpine AS build

WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Install PostgreSQL client tools only
RUN apk add --no-cache postgresql-client

# Copy package files and install dependencies
COPY package*.json ./
RUN yarn install

# Copy source code and build
COPY . .
# Explicitly add terser, then build using npx
RUN yarn add -D terser && npx vite build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]