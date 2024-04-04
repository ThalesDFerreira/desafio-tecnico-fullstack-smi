
![Animação](https://github.com/ThalesDFerreira/desafio-tecnico-fullstack-smi/assets/99926224/a161bd6a-2201-4e7a-9fa2-4de10e3f7fda)

# Desafio Técnico FullStack SMI

Este projeto foi desenvolvido como parte de um desafio técnico para a empresa SMI. Ele consiste em um sistema de planejamento de demandas para a empresa "La8nhas LLC", permitindo o cadastro, edição e exclusão de demandas, além de listagem e filtragem (CRUD completo).

## Pré-requisitos

Para executar este projeto, você precisará ter instalado em seu sistema:

- Docker
- Git

## Configurações Iniciais

1. Clone o projeto utilizando uma das opções abaixo:

Abra o ternminal Bash e clone o plojeto.

HTTPS - `https://github.com/ThalesDFerreira/desafio-tecnico-fullstack-smi.git`
```bash
git clone https://github.com/ThalesDFerreira/desafio-tecnico-fullstack-smi.git
```

SSH - `git@github.com:ThalesDFerreira/desafio-tecnico-fullstack-smi.git`
```bash
git clone git@github.com:ThalesDFerreira/desafio-tecnico-fullstack-smi.git
 ```


2. Navegue até o diretório do projeto:

```bash
cd desafio-tecnico-fullstack-smi
```
Com esse comando você entrará no diretório do projeto.

3. Execute o seguinte comando no terminal:

```bash
docker-compose up -d
```
Este comando ativa o container da aplicação.

4. Aguarde até que o processo de criação do container seja concluído. Em seguida, você poderá acessar o frontend e o backend:

Frontend: [http://localhost:3000/](http://localhost:3000/)

Backend: [http://localhost:3001/](http://localhost:3001/)

5. Após concluir a análise funcional do software, você pode derrubar os containers criados utilizando o comando:

```bash
docker-compose down
```
Este comando desativa o container da aplicação.

**A título de curiosidade, o Banco de Dados foi criado utilizando SQLite.**
