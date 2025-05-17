FROM node:24-alpine AS build

WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Install PostgreSQL client tools only
RUN apk add --no-cache postgresql-client

# Copy package files
COPY package*.json ./

# First do a clean install with just the package.json
RUN yarn install

# Copy all the source code
COPY . .

# Explicitly add terser
RUN yarn add -D terser

# Create a custom build script using Node.js API directly
RUN echo 'const path = require("path");\
const { build } = require("vite");\
\
async function buildApp() {\
  try {\
    await build({\
      configFile: path.resolve(__dirname, "vite.config.ts"),\
      mode: "production"\
    });\
    console.log("Build completed successfully!");\
  } catch (error) {\
    console.error("Build failed:", error);\
    process.exit(1);\
  }\
}\
\
buildApp();' > build-script.js && \
    node build-script.js

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]