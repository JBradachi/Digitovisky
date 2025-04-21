# Digitóvsky: Equipe-4Ano
Repositório contendo arquivos gerados durante a produção do projeto integrador pela equipe responsável pelo 4º Ano.

## Table of Contents
- [Digitóvsky: Equipe-4Ano](#digitóvsky-equipe-4ano)
  - [Table of Contents](#table-of-contents)
  - [Como Executar o Jogo?](#como-executar-o-jogo)
    - [Download](#download)
    - [Há duas formas de executar:](#há-duas-formas-de-executar)
      - [Forma 1:](#forma-1)
      - [Forma 2:](#forma-2)
  - [Composição](#composição)
  - [Processo](#processo)
  - [Gitflow](#gitflow)
    - [Main](#main)
    - [Sprint](#sprint)
    - [Develop](#develop)
    - [Hotfix](#hotfix)
    - [Feature](#feature)
    - [Ideas](#ideas)
  - [Issue tracking](#issue-tracking)
  - [Instalação de dependencias](#instalação-de-dependencias)



## Como Executar o Jogo?

### Download

Baixe o release mais recente do projeto clonando o repositório ou baixando diretamente o código fonte do [release mais recente](https://github.com/ProjetoIntegradorUFV2024/Equipe-4Ano/releases/latest) (Seção "Assets" do release "latest")

Para executar o jogo é bem simples: 

1. Instale o Docker na sua máquina [Clique aqui para aprender a instalar](./Documentos/guias/DEPENDENCIAS.md)

> OBS: Para jogar só precisamos do docker, não se preocupe com as outras dependencias (elas são usadas apenas para editar o código)

> OBS: Caso saiba como rodar o [docker rootless mode](https://docs.docker.com/engine/security/rootless/) é indicado 

### Há duas formas de executar:

#### Forma 1:

1. Caso o jogo não esteja configurado com os dados da rede execute o script setup.sh, 
   
    Se ele já foi configurado siga para o proximo passo

2. Execute o arquivo digitóvsky.sh

#### Forma 2:

1. Abra o terminal e execute os seguintes comandos:

Configure os dados de rede caso não estejam configurados:

```shell
$ ./setup.sh
```

Entre na pasta do digitóvsky:

```shell
$ cd digitovsky/
```

2. Execute o docker compose:

```shell
$ sudo docker compose up
```

Em ambos os casos:

Espere alguns instantes para todas as partes iniciarem...

(Isso levará de 1 a 3 minutos, a primeira vez que é executado sempre demora)

Depois desse tempo basta abrir em seu navegador predileto o link abaixo

[http://localhost:3000/](http://localhost:3000/)

Prontinho, divirta-se ;)

>OBS: Caso queira apagar os dados do jogo, basta entrar na pasta [/digitovsky](/digitovsky/) no terminal e escrever o comando ```sudo docker compose down```, esse comando irá apagar todos os dados, containers e imagens do digitóvsky.

## Composição
Este repositório é composto por 4 pastas principais:

 - **.github** > usado para automatizar ações com o github actions; 

 - **[digitovsky](/digitovsky)** > pasta onde será versionado o código fonte do jogo proposto, dividido em três diretórios de desenvolvimento: **[frontend](/digitovsky/frontend/)**,  **[backend](/digitovsky/backend/)** e **[database](/digitovsky/database/)**; 

 - **[Documentos](/Documentos/)** > pasta dedicada para documentações, incluindo código de conduta e outros documentos relevantes que foram utilizadas durante a elaboração do software, como scripts e versionamento do magic-pact;
 
 - **[provaConceito](/provaConceito/)** > pasta dedicada para persistencia da prova de conceito;

 Papeis responsáveis pela atualização/alteração de cada diretório:
 
| .github                           |
| --------------------------------- |
| Analista de qualidade             |
| Gerente de configuração e mudança |

| digitovsky                        |
| --------------------------------- |
| Dev junior POO/BD                 |
| Dev senior                        |
| Arquiteto de software             |
| Designer (ASOF)                   |
| Designer de jogo                  |
| Gerente de configuração e mudança |

| guias                             |
| --------------------------------- |
| Dev senior                        |
| Arquiteto de software             |
| Designer (ASOF)                   |
| Analista de qualidade             |
| Gerente de configuração e mudança |

| provaConceito                     |
| --------------------------------- |
| Arquiteto de software             |
| Gerente de configuração e mudança |

> OBS: Todos os papéis podem vizualizar o conteúdo das pastas, mas apenas os indicados acima podem modifica-las.

## Processo
O processo de software utilizado para o desenvolvimento desta aplicação foi o [MAGIC-PACT Atualizado 2024](/Documentos/Processo/), para consulta-lo o mesmo se encontra no diretório [/guias](/Documentos/guias/) dentro do arquivo [esof.zip](/Documentos/guias/esof.zip) com seus devidos tutoriais de visualização e atualização para futuras edições do Projeto Integrador.

Como estamos usando esse momento para atualiza-lo, criamos uma pasta para o versionamento do mesmo: [/Documentos/Processo/](/Documentos/Processo/), nela é possível ver o magic mais atual e as modificações feitas de acordo com cada sprint.

## Gitflow
Para uma melhor organização das branchs durante o desenvolvimento, será utilizado o seguinte padrão de incremento:

![gitflow](/Documentos/guias/imagensmd/GitFlow.png)

### Main

- A branch principal que representa o software em desenvolvimento será a main, dela serão criadas as branchs de desenvolvimento com o padrão léxico **Develop\<CodigoCasoDeUso\>** e a branch de correção de pequenos erros com o padrão léxico **Hotfix\<numeroDoErro\>**.

   > Apenas os cargos mais altos de desenvolvedores podem dar merge de branchs Develop e Hotfix, com o aval dos **Analistas de qualidade** mediante pull request

### Sprint
 - As branchs sprint servem para integração de casos de uso em uma mesma sprint e para criar releases do projeto com base nas sprints. criadas pelos **desenvolvedores seniors** e **designers** com o padrão léxico **Sprint<nºsprint>**
  - Exemplo: Sprint01

### Develop
- A branch de desenvolvimento será usada para a integração das features criadas pelos **desenvolvedores seniors** e **designers** que solucionam os casos de uso préviamente documentados, dela serão criadas branchs features com o padrão léxico **Feature\<Tipo[POO, BD, FRONT, BACK], CodigoCasoDeUso>** (parece grande mas na prática irá ajudar muito).
- Exemplo: DevelopCSU02
  
### Hotfix

- A branch Hotfix será usada em casos extremos de não haver necessidade de se criar uma branch develop para resolver um bug ou algo do tipo. 

    >Apenas os cargos mais altos de desenvolvedor podem criar essa branch. Vale ressaltar que o merge só poderá acontecer após o aval dos **Analistas de qualidade** mediante pull request

   > **ATENÇÃO**: é estritamente PROIBIDO a alteração de código diretamente na branch "main".
- Exemplo: Hotfix03

### Feature

- As branchs features são criadas pelos seus respectivos desenvolvedores (Dev senior [BACK, POO, BD], Designer de jogo [FRONT]), a partir delas os Devs juniors poderão criar uma branch cada um por tipo que irá atuar, com o padrão léxico **ideas\<matricula, TIPO, CodigoCasoDeUso>**. Nas branchs features de tipo BACK e FRONT não há a necessidade de criar uma branch idea.
- Exemplo: FeatureFrontCSU04

### Ideas

- As branchs ideas são as que os Devs junior irão atuar, eles poderão cria-las a partir da branch feature, resolver a tarefa proposta e posteriormente abrir um pull request da solução pensada. A melhor solução irá ser integrada ao código.

>**OBS:** Os Códigos dos casos de Uso e dos códigos de erro deverão ser documentados e expostos no ClickUp

- Exemplo: Ideas5078CSU05
- Vale ressaltar que as branchs Ideas são apagadas após cada sprint, mas para mantermos os cálculos das métricas estamos salvando elas como [tags](https://github.com/ProjetoIntegradorUFV2024/Equipe-4Ano/tags) no github

## Issue tracking
Um [tutorial de issue tracking](/Documentos/guias/Tutorial%20Issue%20Tracking%20GitHub.pdf) promovido pela Mestranda Estela Miranda está na pasta [Documentos/guias/](/Documentos/guias/), iremos seguir o padrão recomendado.

Foi criado também padrões de [Issues no Github](https://github.com/ProjetoIntegradorUFV2024/Equipe-4Ano/issues/templates/edit), ao abrir uma nova issue, selecione o tipo desejado para usar o templete. Caso precise de um novo padrão, crie uma issue de Requisição de feature expondo a idéia do novo padrão. 

![issues](/Documentos/guias/imagensmd/issuesTemplates.png)

Vale resaltar o uso dos [Labels](https://github.com/ProjetoIntegradorUFV2024/Equipe-4Ano/labels) para marcar sobre o que é aquela issue (esses usamos os que o próprio github já oferece, mas se quiser é possível criar novos, basta clicar em new label).

![alt text](/Documentos/guias/imagensmd/Labels.png)

Também nessa mesma ideia foram criados [Milestones](https://github.com/ProjetoIntegradorUFV2024/Equipe-4Ano/milestones?state=closed) para organizar as issues de cada uma das sprints, e assim resolver no melhor momento cada uma delas (para criar um milestone basta clicar em "new milestone")

![alt text](/Documentos/guias/imagensmd/milestones.png)

## Instalação de dependencias

Para apenas executar o projeto basta executar os passos da seção [Como executar o jogo](#como-executar-o-jogo) e acessar o link [http://localhost:3000/](http://localhost:3000/)  no seu navegador predileto

Para edição e incremento do projeto existe a possibilidade de usar apenas o container criado, mas não é recomendado. Em vez disso instale as dependencias:

Backend:
- openJDK 17 (ou superior)
- mysql 8.0 (ou superior, usamos o [latest do dockerhub](https://hub.docker.com/_/mysql))
- gradle 8.10.2 (ou superior apenas se for mudar a versão do gradle)
- ferramenta para depurar API rest [Postman, Insonia] (Opcional)

Frontend:
- node 18 
- npm 10.9.2 (next-10) 

Tutoriais de download e instalação das ferramentas citadas acima se encontram dentro do diretório [/guias](/Documentos/guias/) no arquivo [DEPENDENCIAS.md](/Documentos/guias/DEPENDENCIAS.md)

