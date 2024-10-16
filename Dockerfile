FROM openjdk:17-jdk-alpine

# Instalação do gradle do site
ARG GRADLE_VERSION=8.10.2
RUN apk add --no-cache curl; \
    curl https://downloads.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip > gradle.zip; \
    unzip gradle.zip && rm gradle.zip; \
    apk del curl

# Adição dos binários do gradle ao PATH da imagem do contêiner
ENV PATH=${PATH}:/gradle-${GRADLE_VERSION}/bin

COPY . /usr/local/service
WORKDIR /usr/local/service

# Construir o projeto Spring boot
RUN gradle build

# Executar o JAR Spring Boot
CMD ["java", "-jar", "build/libs/digitovskyApplication.jar"]