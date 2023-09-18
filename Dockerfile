# Backend dependencies (base)
FROM node:18-alpine3.17 as base
WORKDIR /main
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
COPY ./package.json /main/

# Backend dependencies (production)
FROM base as server-deps-release
RUN npm install --only=production --ignore-scripts 

# Build backend
FROM base as server-builder
WORKDIR /main
COPY . /main/
RUN npm install --ignore-scripts 
RUN npm run build

# Run server
FROM base as release
WORKDIR /main

ENV NODE_ENV=production
ENV TZ=Europe/Rome

# server build
COPY --from=server-builder /main/build /main/

# server deps 
COPY --from=server-deps-release /main/node_modules /main/node_modules


ENTRYPOINT [ "node", "index.js"]
