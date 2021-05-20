FROM node:14.16-alpine AS builder
WORKDIR /build

COPY . .

RUN npm install && \
    npm run build

FROM node:14.16-alpine
RUN mkdir -p /work/frontend
WORKDIR /work/frontend

COPY package*.json ./

RUN npm install --production --cache /tmp/empty-cache && \
    rm -rf /tmp/empty-cache
COPY --from=builder /build/dist ./dist

CMD [ "npm", "run", "dev" ]