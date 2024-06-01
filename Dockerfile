FROM node

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install
RUN npm rebuild bcrypt --build-from-source

COPY src ./src
COPY dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
