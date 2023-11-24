import Mail from '../lib/Mail';

interface Mail {
  data: {
    user: {
      name: string;
      email: string;
    }
  }
}

export default {
  key: 'MessageReceived',
  async handle({ data }: Mail) {
    const { user } = data;    

    await Mail.sendMail({
      from: "Queue test <queue@queue.com>",
      to: `${user.name} <${user.email}>`,
      subject: "Cadastro de usuario",
      html: `Olá, ${user.name}, Bem vindo ao sistema de filas do SEO.Chat`
    });
  }
}