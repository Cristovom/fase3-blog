# 1. Usar uma imagem oficial do Node
FROM node:18

# 2. Criar uma pasta no container
WORKDIR /app

# 3. Copiar os arquivos para o container
COPY package*.json ./
COPY . .

# 4. Instalar as dependências
RUN npm install

# 5. Expor a porta
EXPOSE 3000

# 6. Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
