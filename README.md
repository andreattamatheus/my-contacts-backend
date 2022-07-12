## Resumo do Projeto
Construirmos uma API REST utilizando apenas os módulos nativos do próprio Node. Zero dependências por aqui!

Depois de aprender como o Node funciona sozinho, refazemos tudo utilizando o framework mais famoso e utilizado no mercado: o Express. Além disso, abordarmos Docker, Postgres, SQL e alguns patterns como o Singleton e o Repository.

Construímos um projeto que se integra com a API desenvolvida no Módulo 4 utilizando um Client HTTP que construímos do zero utilizando a fetch API do próprio JavaScript.

React Router (v5)

E claro: usando apenas os pacotes necessários, aqui fazemos tudo na mão!



### Começando o Setup do Node
- yarn install

### Rodando Docker Image do postgres
- docker pull image
- docker run --name pg -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres
- docker exec -it pg bash
- psql -U root


## Anotações
React Router (v5)
Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

