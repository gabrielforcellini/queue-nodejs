import expressWinston from 'express-winston';
import { format, transports } from 'winston';

const { json, prettyPrint, timestamp, combine } = format;
const { File } = transports;

/**
 * Middleware que cria logs de acordo com o status da requisição.
 * Status 200: info.log
 * Status 400: warning.log
 * Status 500: error.log
 */
export const Logger = expressWinston.logger({
  transports: [
    new File({ filename: 'warning.log', level: 'warn' }),
    new File({ filename: 'error.log', level: 'error' }),
    new File({ filename: 'info.log', level: 'info' })
  ],
  format: combine(json(), timestamp(), prettyPrint()),
  requestWhitelist: ['headers', 'body'],
  responseWhitelist: ['headers', 'body'],
  expressFormat: true,
  meta: true,
  statusLevels: true
});
