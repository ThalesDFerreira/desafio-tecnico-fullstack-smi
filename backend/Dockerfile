FROM node:16.14-alpine

EXPOSE 3001

WORKDIR /backend

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]