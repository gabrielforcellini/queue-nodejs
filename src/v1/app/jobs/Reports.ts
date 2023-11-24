import { Mail } from '../../types/Mail';

export default {
  key: 'MessageStatus',
  async handle({ data }: Mail) {
    const { user } = data;    

    console.log(user);
    
  }
}