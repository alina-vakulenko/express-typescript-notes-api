FROM node:16-alpine

RUN mkdir "notes-api"

WORKDIR /notes-api

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY tsconfig.json ./
COPY jest.config.ts ./
COPY src ./src

CMD ["npm", "run", "start:dev"]