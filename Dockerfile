FROM node:19-bullseye

WORKDIR /app

COPY package*.json ./

RUN npm install --production

RUN npm install -g ts-node typescript

COPY . .

RUN npx tsc

COPY ./scripts/wait-for-it.sh ./scripts/wait-for-it.sh

RUN chmod +x ./scripts/wait-for-it.sh

EXPOSE 3000

CMD [ "node", "dist/index.ts" ]

