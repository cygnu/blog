FROM node:14.16-alpine
RUN mkdir -p /work/frontend
WORKDIR /work/frontend

COPY . .

RUN npm install -y
RUN npm run build

CMD ["npm", "run", "start"]