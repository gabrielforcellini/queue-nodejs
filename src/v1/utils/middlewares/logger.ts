import expressWinston from 'express-winston';
import winston, { format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { json, prettyPrint, timestamp, combine } = format;

/**
 * Middleware que cria logs de acordo com o status da requisição.
 * Status 200: info.log
 * Status 400: warning.log
 * Status 500: error.log
 */
export const ExpressLogger = expressWinston.logger({
  transports: [
    new DailyRotateFile({
      filename: './src/v1/logs/warning-%DATE%.log',
      level: 'warn',
      datePattern: 'DD-MM-YYYY-HH',
      zippedArchive: true,
      maxFiles: '14d'
    }),
    new DailyRotateFile({
      filename: './src/v1/logs/error-%DATE%.log',
      level: 'error',
      datePattern: 'DD-MM-YYYY-HH',
      zippedArchive: true,
      maxFiles: '14d'
    }),
    new DailyRotateFile({
      filename: './src/v1/logs/info-%DATE%.log',
      level: 'info',
      datePattern: 'DD-MM-YYYY-HH',
      zippedArchive: true,
      maxFiles: '14d'
    })
  ],
  format: combine(json(), timestamp(), prettyPrint()),
  requestWhitelist: ['headers', 'body'],
  responseWhitelist: ['headers', 'body'],
  expressFormat: true,
  meta: true,
  statusLevels: true
});

export const Logger = winston.createLogger({
  transports: [
    new DailyRotateFile({
      filename: './src/v1/logs/warning-%DATE%.log',
      level: 'warn',
      datePattern: 'DD-MM-YYYY-HH',
      zippedArchive: true,
      maxFiles: '14d'
    }),
    new DailyRotateFile({
      filename: './src/v1/logs/error-%DATE%.log',
      level: 'error',
      datePattern: 'DD-MM-YYYY-HH',
      zippedArchive: true,
      maxFiles: '14d'
    }),
    new DailyRotateFile({
      filename: './src/v1/logs/info-%DATE%.log',
      level: 'info',
      datePattern: 'DD-MM-YYYY-HH',
      zippedArchive: true,
      maxFiles: '14d'
    })
  ],
  format: combine(json(), timestamp(), prettyPrint())
});
