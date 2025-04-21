# 1. Dependências 

## 1.1. Table of contents

- [1. Dependências](#1-dependências)
  - [1.1. Table of contents](#11-table-of-contents)
  - [1.2. Linux](#12-linux)
    - [1.2.1. git](#121-git)
    - [1.2.2. Java](#122-java)
    - [1.2.3. MySQL](#123-mysql)
    - [1.2.4. Docker](#124-docker)
  - [1.3. Windows](#13-windows)
    - [1.3.1. git](#131-git)
    - [1.3.2. Java](#132-java)
    - [1.3.3. MySQL](#133-mysql)
    - [1.3.4. Docker](#134-docker)

## 1.2. Linux

 1. [git](#git)

 2. [java](#java)

 3. [mysql](#mysql)

 4. [docker](#docker)

### 1.2.1. git

Atualize seu instalador de pacotes (Exemplo para derivados de Ubuntu ou sistemas que usam apt)

```sudo apt update```

```sudo apt upgrade```

```sudo apt autoremove```

```sudo apt clean```

Clique [aqui](https://git-scm.com/book/pt-br/v2/Come%C3%A7ando-Instalando-o-Git) para acessar o link de como instalar

Caso queiram uma recomendação de interface gráfica, veja [Github Desktop](https://gist.github.com/berkorbay/6feda478a00b0432d13f1fc0a50467f1)

Para utilizar o git é necessário configurar a ferramenta, essa ação é bem simples, basta seguir o passo a passo do [manual](https://git-scm.com/book/pt-br/v2/Come%c3%a7ando-Configura%c3%a7%c3%a3o-Inicial-do-Git)

### 1.2.2. Java

A versão do java que iremos instalar é o Java 17, se você tiver um java mais recente instalado não é necessário fazer o downgrade

Para instalar o java no Linux basta escrever os seguintes comandos no terminal:

```sudo apt update```

```sudo apt install -y openjdk-17-jdk```

```sudo apt install -y openjdk-17-jre```

Para verificar se a instalação foi realizada com sucesso basta digitar 

```java -version```

A instalação do gradle é feita assim que executar a pasta de arquivos backend com os binários do gradle

### 1.2.3. MySQL

Para instalar o mysql no linux basta acessar [este link](https://dev.mysql.com/downloads/workbench/) para fazer download dos pacotes e instalar o mysql workbench, após isso instale o mysql server caso não tenha vindo junto com o pacote.

```sudo apt install mysql-server```

> ATENÇÃO: o workbench está disponível **apenas** para as versões mais recentes do linux. (A sugestão é usar o windows)

Mas apenas para rodar o jogo o [docker](#docker) já basta

### 1.2.4. Docker

O ferramenta CHATA de se configurar... Mas depois de configurada a portabilidade é gigante.

Para instalar a ferramenta basta seguir o seguinte [tutorial](https://docs.docker.com/engine/install/), se atente bem a distro de seu linux viu? 


## 1.3. Windows

1. [git](#git-1)

2. [java](#java-1)

3. [mysql](#mysql-1)

4. [docker](#docker-1)

### 1.3.1. git

Para instalar o git no windows basta baixar o 
instalador e seguir com a instalação normalmente

Clique [aqui](https://git-scm.com/downloads/win) 
para acessar o link de como instalar

Caso queiram uma recomendação de interface gráfica,
 veja [Github Desktop](https://desktop.github.com/download/)

Para utilizar o git é necessário configurar a ferramenta, essa ação é bem simples, basta seguir o passo a passo do [manual](https://git-scm.com/book/pt-br/v2/Come%c3%a7ando-Configura%c3%a7%c3%a3o-Inicial-do-Git)

### 1.3.2. Java

Caso você já possua uma versão mais recente do Java, não há a necessidade de reinstalar. Para verificar se possui ou qual versão está em seu computador, abra o terminal e digite
```java --version```

Se você não possui o java ou tem uma versão menos recente: acesse o [link](https://learn.microsoft.com/pt-br/java/openjdk/download#openjdk-17) e baixe o instalador (msi) de sua arquitetura do computador (Na duvida tente x64: "microsoft-jdk-17.0.12-windows-x64.msi").

Após isso inicie o instalador, clique em next, aceite os termos. Quando chegar na parte "Custom setup" troque a opção "Set or override JAVA_HOME variable" para "will be installed on local hard drive" como mostrado na imagem

![jar](/Documentos/guias/imagensmd/image.png)

### 1.3.3. MySQL

Easy peasy baixe o [instalador](https://dev.mysql.com/downloads/windows/installer/8.0.html) e execute.

>OBS: é a versão "mysql-installer-community-8.0.40.0.msi" (a mais pesada).

Verão mais instruções de como usar com o professor Daniel 

### 1.3.4. Docker

O ferramenta CHATA de se configurar... Mas depois de configurada a portabilidade é gigante.

O sistema operacional Windows não possúi suporte para o Docker, mas possúi a ferramenta Docker Desktop que instala uma maquina virtual e executa o docker lá, uma boa opção para aqueles que possuem pouca memória no PC, ou não querem instalar uma distro linux somente para o PI.

Para baixar o instalador acesse o [link](https://docs.docker.com/desktop/install/windows-install/), selecione a versão da arquitetura de seu computador e execute (se você tiver duvidas tente a x86_64 ;) ).