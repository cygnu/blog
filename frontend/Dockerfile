FROM node:14.16
RUN mkdir -p /work/frontend
WORKDIR /work/frontend
COPY . .

RUN npm install
RUN npm run build
RUN rm -rf ./node_modules &&\
    npm install --production

CMD [ "npm", "dev" ]
