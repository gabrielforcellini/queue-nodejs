import { Request, Response } from 'express';
import Queue from "../lib/Queue";

export default {
  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const user = {
      name,
      email,
      password,
    }

    // adicionar job registrationMail na fila
    await Queue.add('RegistrationMail', { user });

    return res.json({sucess: true, user});
  }
}