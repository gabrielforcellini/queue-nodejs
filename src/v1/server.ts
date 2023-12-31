import 'dotenv/config';
import express, { Request, Response } from 'express';
import UserController from '../v1/app/controllers/UserController';
import Queue from './app/lib/Queue';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import bodyParser from 'body-parser';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ensureLoggedIn } from 'connect-ensure-login';
import { ExpressLogger, Logger } from './utils/middlewares/logger';
import { Session } from './utils/middlewares/session';
const usuario = process.env.AUTH_USER;
const senha = process.env.AUTH_PASS;
const port = process.env.SERVER_PORT || 3333;

if (!usuario) {
  console.error(
    'Erro: Usuário de autenticação do acesso ao monitoramento de fila não informado.'
  );
}

if (!senha) {
  console.error(
    'Erro: Senha de autenticação do acesso ao monitoramento de fila não informado.'
  );
}

passport.use(
  new LocalStrategy(function (username, password, cb) {
    if (
      username === process.env.AUTH_USER &&
      password === process.env.AUTH_PASS
    ) {
      return cb(null, { user: process.env.AUTH_USER });
    }
    return cb(null, false);
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

/**
 * Cria o monitoramento de filas, listando todas as filas existentes no projeto
 * setBasePath: Define rota base para o monitoramento
 */
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');
createBullBoard({
  queues: Queue.queues.map((queue) => new BullAdapter(queue.bull), {
    allowRetries: false
  }),
  serverAdapter,
  options: {
    uiConfig: {
      boardTitle: 'Fila Chat',
      miscLinks: [{ text: 'Logout', url: '/admin/logout' }]
    }
  }
});

const app = express();
// Configura view engine para renderizar EJS templates.
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(Session);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  passport.session({
    pauseStream: true
  })
);
app.use(ExpressLogger);

/**
 * Middleware que define o monitoramento de filas
 * ensureLoggedIn: Garante que o usuário precisa estar logado para acessar,
 * caso contrário, redireciona para a página de login.
 */
app.use(
  '/admin/queues',
  ensureLoggedIn({ redirectTo: '/admin/login' }),
  serverAdapter.getRouter()
);
app.post('/users', UserController.store);
app.get('/admin/login', (req, res) => {
  res.render('login', { invalid: req.query.invalid === 'true' });
});

/**  Rota de login do monitoramento de fila
 * Caso faça a autenticação corretamente redireciona para a página de
 * monitoramento.
 * Caso dê algo errado, redireciona para a página de login mostrando erro.
 */
app.post(
  '/admin/login',
  passport.authenticate('local', {
    failureRedirect: '/admin/login?invalid=true'
  }),
  (req: Request, res: Response) => {
    res.redirect('/admin/queues');
  }
);

app.get('/admin/logout', (req: Request, res: Response) => {
  try {
    req.session.destroy(() => {
      res.redirect('/admin/login');
    });
  } catch (error) {
    console.error('Erro ao fazer logout: ', error);
  }
});

app.listen(port, () => {
  Logger.info(`server running on localhost: ${port}`);
  console.log(`server running on localhost: ${port}`);
});
