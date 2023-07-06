import Mail from '../lib/Mail';

export default {
  key: 'RegistrationMail',
  async handle({ data }: any) {
    const { user } = data;

    await Mail.sendMail({
      from: "Queue test <queue@queue.com>",
      to: `${user.name} <${user.email}>`,
      subject: "Cadastro de usuario",
      html: `Olá, ${user.name}, Bem vindo ao sistema de filasdo SEO.Chat`
    });
  }
}