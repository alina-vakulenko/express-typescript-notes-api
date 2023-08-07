FROM node:lts-alpine

RUN mkdir "notes-api"

WORKDIR /notes-api

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY ./src ./src
COPY tsconfig.json .
COPY jest.config.ts .

CMD ["npm", "run", "start:dev"]