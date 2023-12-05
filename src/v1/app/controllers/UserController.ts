import { Request, Response } from 'express';
import Queue from '../lib/Queue';
import { User } from 'User';

export default {
  async store(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user: User = {
        user: {
          name,
          email,
          password
        }
      };

      // Adiciona job registrationMail na fila
      await Queue.add('MessageReceived', user);
      await Queue.add('MessageStatus', user);

      return res.json({ sucess: true, user });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
};
