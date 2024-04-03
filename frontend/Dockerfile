FROM node:16.14-alpine

EXPOSE 3000

WORKDIR /frontend

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]