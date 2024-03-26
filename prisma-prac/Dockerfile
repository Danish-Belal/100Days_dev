FROM node:20

WORKDIR /usr/sec/app

COPY package* .
COPY ./prisma .

RUN npm install
RUN npx prisma generate

COPY . .

RUN npm run build



CMD ["node", "dist/01-create-user.js"]