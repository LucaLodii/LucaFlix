[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19624122&assignment_repo_type=AssignmentRepo)

# Trabalho Prático 2 - Solução completa

Nesta atividade, você irá completar o projeto anterior permitindo cadastrar e alterar dados da entidade principal do do seu projeto a partir da estrutura criada na etapa anterior com o JSONServer. Para isso, crie uma **página de cadastro (cadastro_[ENTIDADE].html)**, que deve mostrar um formulário para cadastrar a entidade principal do projeto. OBS: Troque [ENTIDADE] pelo nome da sua entidade principal.

## Informações do trabalho

- Nome: Luca Guimarães Lodi
- Matricula:  885517
- Proposta de projeto escolhida:  Catálogo de Filmes
- Breve descrição sobre seu projeto:  Um site inspirado no universo de Tolkien com um estilo de "Terra Média" com referências a Trilogia "O Senhor Dos Anéis" e com um toque de clubismo.

# LucaFlix

LucaFlix é um site inspirado no universo de O Senhor dos Anéis. Ele permite que usuários explorem uma lista de filmes, adicionem favoritos, cadastrem novos filmes e também novos usuários.

---

## Como executar

1. Clone o repositório:
git clone https://github.com/seu-usuario/LucaFlix.git
cd LucaFlix

2. Instale as dependências:

3. Inicie o projeto:

A aplicação será iniciada automaticamente no navegador em http://localhost:3000 (ou similar, dependendo da sua configuração).

---

## Funcionalidades

- Buscar filmes por nome
- Visualizar lista de filmes com trailers
- Adicionar ou remover filmes da lista de favoritos
- Cadastrar novos filmes com nome, imagem, nota e descrição
- Cadastro e login de usuários
- Validação de dados no formulário de login e cadastro
- Layout responsivo adaptado para diferentes tamanhos de tela
- Design temático baseado em O Senhor dos Anéis
- Armazenamento de dados local com uso de localStorage

---

## Login e Cadastro

A aplicação possui uma área de autenticação simples, onde o usuário pode:

- Criar uma nova conta por meio do formulário de cadastro
- Fazer login utilizando e-mail e senha previamente cadastrados

Os dados são armazenados em localStorage e utilizados para controlar o acesso e a personalização da navegação.

---

## Cadastro de Filmes

Na página de cadastro de filmes, o usuário pode:

- Inserir o nome do filme
- Definir uma nota
- Adicionar a imagem e uma breve descrição

Após o envio, o filme passa a aparecer na lista principal e pode ser favoritado ou buscado.

---

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript (vanilla)
- Node.js para servir a aplicação (com live-server ou similar)
- Armazenamento de dados com localStorage

---

## Estrutura de diretórios (resumida)

```plaintext
LucaFlix/
├── db/
│   └── db.json
├── node_modules/
├── public/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── detalhes.css
│   │   │   ├── favoritos.css
│   │   │   ├── genero.css
│   │   │   ├── movie-register.css
│   │   │   ├── stylelogin.css
│   │   │   ├── styles.css
│   │   │   └── user-register.css
│   │   ├── img/
│   │   │   └── (imagens do projeto)
│   │   ├── scripts/
│   │   │   ├── app.js
│   │   │   └── login.js
│   │   └── trailer/
│   │       └── (vídeos do projeto)
│   ├── detalhes.html
│   ├── favoritos.html
│   ├── genero.html
│   ├── index.html
│   ├── login.html
│   ├── movie-register.html
│   └── user-register.html
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

---

## Licença

Este projeto foi desenvolvido com fins educacionais. Fique à vontade para usar, modificar e adaptar conforme necessário.
