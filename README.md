# Envio de e-mails

Projeto em NodeJs implementando uma fila que fará o envio de e-mails.

## Status

Desenvolvimento

## Requisitos

Criar uma conta gratuita no [MailTrap](https://mailtrap.io/pt/).

## Instalação

Clone este projeto utilizando o git

```bash
git clone https://github.com/gabrielforcellini/queue-nodejs.git
```

Instale as dependências do NodeJs

```bash
npm install
```

Instale o Redis
[Redis](https://redis.io/docs/install/install-redis/)

## Configuração

Defina as credenciais no arquivo .env

## Uso

Execute este projeto

```bash
npm run dev
```

Ou então execute este projeto em modo de produção

```bash
npm run build
&&
npm run start
```

## Tecnologias utilizadas

- **Linguagem de Programação:** Typescript
- **Framework:** Express
- **Banco de Dados:** Redis
- **Gerenciador de Pacotes:** npm
- **Sistema de Controle de Versão:** Git
- **Ferramenta de Log:** Winston
- **Ferramenta Email Sandbox:** MailTrap

## Pacotes NPM

- `express`: Framework para construção de aplicativos web.
- `bull`: Ferramenta para implementação de sistema de filas.
- `bull-board & @bull-board/express & @bull-board/ui`: UI para visualizar as filas e trabalhos.
- `nodemailer`: Pacote para fazer o envio de e-mails pelo Node.js.
- `jest`: Pacote para criar testes unitários.
- `express-winston`: Pacote de log para Node.js.
- `dotenv`: Pacote para carregar variáveis de ambiente ao projeto.
- `passport`: Middleware de autenticação para Node.js.
- `passport-local`: Permite autenticar usando um nome de usuário e senha.
- `nodemon`: Reinicialização automática quando atualiza algo do código.
- `winston`: Ferramenta de log para Node.js.

# Ferramentas de Desenvolvimento

- **Visual Studio Code:** Ambiente de desenvolvimento integrado.
- **Postman:** Teste de APIs.
- **Git/GitHub:** Controle de versão e colaboração.

## Contato

Gabriel Forcellini

Phone: +48 991367252

## License

[MIT](https://choosealicense.com/licenses/mit/)