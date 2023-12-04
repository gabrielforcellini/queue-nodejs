import session from 'express-session';

export const Session = session({
  secret: 'Fila chat',
  cookie: { maxAge: 3600000 }, // Tempo em milissegundos
  saveUninitialized: false,
  resave: true
});
