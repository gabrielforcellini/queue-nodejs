import { User } from 'User';


export interface Queue {
  name: string;
  data: User
}

export interface Mail {
  data: {
    user: {
      name: string;
      email: string;
    }
  }
}
