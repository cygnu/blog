FROM node:14.16-alpine
RUN mkdir -p /work/frontend
WORKDIR /work/frontend

COPY package*.json ./
RUN npm install -y
COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]