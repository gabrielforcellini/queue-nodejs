import Queue, { QueueOptions } from 'bull';
import redisConfig from '../../config/redis';

import * as jobs from '../jobs';

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, redisConfig as Queue.QueueOptions),
  name: job.key,
  handle: job.handle
}))

export default {
  queues,
  add(name: string, data: any) {
    const queue = this.queues.find(queue => queue.name === name);
    if (!queue)
      throw new Error("Erro");
      
    return queue.bull.add(data);
  },
  process() {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle);

      queue.bull.on('failed', (job, err) => {
        console.log('Job failed', job.data);
        console.log(err);
      });
    })
  }
};