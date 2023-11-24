import 'dotenv/config';
import express from 'express';
import UserController from '../v1/app/controllers/UserController';
import Queue from './app/lib/Queue';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

const app = express();

createBullBoard({
  queues: Queue.queues.map((queue) => new BullAdapter(queue.bull), {
    allowRetries: false
  }),
  serverAdapter,
  options: {
    uiConfig: {
      boardTitle: 'Fila Chat'
    }
  }
});

app.use(express.json());
app.post('/users', UserController.store);
app.use('/admin/queues', serverAdapter.getRouter());

app.listen(3333, () => {
  console.log('server running on localhost:3333');
});
