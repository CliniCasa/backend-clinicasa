# Projeto Clinicasa (Backend)

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

Backend desenvolvido com NestJS para o sistema de gerenciamento da ClínicaSa. O projeto utiliza TypeORM para o mapeamento objeto-relacional com um banco de dados PostgreSQL, que é gerenciado em um ambiente de desenvolvimento com Docker.

## Tecnologias Utilizadas

-   **Framework:** [NestJS](https://nestjs.com/)
-   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
-   **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
-   **ORM:** [TypeORM](https://typeorm.io/)
-   **Ambiente de Desenvolvimento:** [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

---

## Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:
* [Node.js](https://nodejs.org/en/) (v18.x ou superior)
* [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
* [Docker](https://www.docker.com/products/docker-desktop/)
* [Git](https://git-scm.com/)

---

## Como Rodar o Projeto

Siga os passos abaixo para configurar e executar o ambiente de desenvolvimento local.

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    ```

2.  **Acesse a pasta do projeto:**
    ```bash
    cd nome-do-repositorio
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente:**
    Crie uma cópia do arquivo de exemplo `.env.example` e renomeie-a para `.env`.
    ```bash
    cp .env.example .env
    ```
    > **Nota:** O arquivo `.env` contém dados sensíveis e não deve ser versionado (já está no `.gitignore`).

5.  **Inicie o banco de dados com Docker:**
    Este comando irá criar e iniciar o contêiner do PostgreSQL em segundo plano.
    ```bash
    docker-compose up -d
    ```

---

## Executando a Aplicação

Com o banco de dados rodando, inicie o servidor NestJS em modo de desenvolvimento.

```bash
npm run start:dev
