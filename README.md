# Desafio: Fundamentos do Node.js — Rocketseat Ignite

Este projeto é um desafio prático proposto no curso **Ignite** da [Rocketseat](https://rocketseat.com.br/), pertencente à trilha de **backend com Node.js**.

A proposta do desafio é construir uma API que gerencie tarefas (tasks), utilizando os conhecimentos fundamentais de Node.js, como rotas, manipulação de dados em memória e leitura de arquivos com streams e iteradores assíncronos.

---

## 🔧 Funcionalidades da API

A API permite realizar as seguintes operações com tasks:

- ✅ **Criar uma task**  
  Envia um `POST` para `/tasks` com `title` e `description`.

- 📋 **Listar todas as tasks**  
  Envia um `GET` para `/tasks` para retornar todas as tarefas cadastradas.

- ✏️ **Atualizar uma task pelo `id`**  
  Envia um `PUT` para `/tasks/:id` para atualizar os campos `title` e `description`.

- ❌ **Remover uma task pelo `id`**  
  Envia um `DELETE` para `/tasks/:id`.

- ✔️ **Marcar uma task como completa pelo `id`**  
  Envia um `PATCH` para `/tasks/:id/complete` para marcar a task como finalizada.

---

## 📂 Importação de tasks via CSV

A funcionalidade extra e mais desafiadora deste projeto é a **importação em massa de tarefas a partir de um arquivo `.csv`**.

### 🛠️ Como funciona:

- É utilizado o pacote [`csv-parse`](https://www.npmjs.com/package/csv-parse) para ler o arquivo CSV.
- Um **iterador assíncrono** percorre linha por linha do arquivo.
- Para cada linha, é enviada uma requisição `POST` para `/tasks`, criando a task com os dados lidos.
- Um script auxilia na geração automática do arquivo CSV e no processo de leitura/importação.
