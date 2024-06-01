FROM node

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el package.json y package-lock.json a /app
COPY package*.json ./
COPY . .

# Instala las dependencias
RUN npm install
RUN npm rebuild bcrypt --build-from-source

# Copia todo el código fuente a /app
COPY src ./src
COPY dist ./dist


# Expone el puerto 3000 en el contenedor
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:dev"]
