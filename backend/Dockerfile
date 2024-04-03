FROM node:21-alpine3.18

EXPOSE 3001

WORKDIR /backend

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]