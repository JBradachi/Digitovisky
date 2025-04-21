# DIGITOVSKY

## Table of contents
- [DIGITOVSKY](#digitovsky)
  - [Table of contents](#table-of-contents)
  - [backend:](#backend)
  - [frontend:](#frontend)
  - [database:](#database)
  - [Docker compose](#docker-compose)

Este diretório é dedicado para o desenvolvimento e versionamento do código principal do software

Ele é composto por 3 grandes partes:

## backend:  
Diretório dedicado para o desenvolvimento do código backend do projeto

[acesse aqui](/digitovsky/backend/) o diretório

## frontend:

Diretório dedicado para o desenvolvimento do código frontend do projeto 

[acesse aqui](/digitovsky/frontend/) o diretório

## database: 

Diretório dedicado para o desenvolvimento do banco de dados do projeto

[acesse aqui](/digitovsky/database/) o diretório

## Docker compose
Arquivo de integração dos conteiners usados
Usamos:
- [Dockerfile](/digitovsky/backend/Dockerfile) do [backend](/digitovsky/backend/)
- [mysql:latest](https://hub.docker.com/_/mysql) do [docker hub](https://hub.docker.com/)
- [Dockerfile](/digitovsky/frontend/Dockerfile) do [frontend](/digitovsky/frontend/)
  
Nesse arquivo foi feita uma pequena configuração do spring, mysql e npm