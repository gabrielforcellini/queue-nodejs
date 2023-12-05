import session from 'express-session';

/**
 * Middleware de sessão do usuário.
 * maxAge: Cookie expira em X milissegundos
 */
export const Session = session({
  secret: 'Fila chat',
  cookie: { maxAge: 3600000 }, // Tempo em milissegundos
  saveUninitialized: false,
  resave: true
});
