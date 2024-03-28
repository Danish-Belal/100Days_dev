FROM node:20

WORKDIR /usr/src/app

COPY package* .
RUN npm install

COPY ./prisma .
RUN npx prisma generate

COPY . .



CMD ["node", "dist/01-create-user.js"]