FROM node:18-alpine

# Instala tudo que é necessário para que o projeto do React funcione.
# Isso envolve executar o procedimento de npm install com o package.json
RUN     npm install -g npm@latest
WORKDIR /usr/local/service
COPY    ./package.json .
COPY    ./package-lock.json .
RUN     npm install
