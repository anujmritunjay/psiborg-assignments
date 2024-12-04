FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN npm i

COPY . .

EXPOSE 4040

CMD [ "npm", "start" ]