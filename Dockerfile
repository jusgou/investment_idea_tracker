FROM node:18-alpine AS build

WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Install PostgreSQL client tools if needed
RUN apk add --no-cache postgresql-client

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Make sure terser is installed for minification
RUN yarn add -D terser

# Create a custom build script to run vite directly
RUN echo "const path = require('path');" > build.js && \
    echo "const { build } = require('vite');" >> build.js && \
    echo "async function buildApp() {" >> build.js && \
    echo "  try {" >> build.js && \
    echo "    await build({ configFile: path.resolve(__dirname, 'vite.config.ts') });" >> build.js && \
    echo "    console.log('Build completed successfully!');" >> build.js && \
    echo "  } catch (error) {" >> build.js && \
    echo "    console.error('Build failed:', error);" >> build.js && \
    echo "    process.exit(1);" >> build.js && \
    echo "  }" >> build.js && \
    echo "}" >> build.js && \
    echo "buildApp();" >> build.js && \
    node build.js

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]