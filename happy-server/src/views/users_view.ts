import User from '../models/User';

interface IUser {
  id: number;
  name: string;
  email: string;
}

export default {
  render({ id, name, email }: User): IUser {
    return {
      id,
      name,
      email,
    };
  },
  renderMany(users: User[]): IUser[] {
    return users.map(user => this.render(user));
  },
};
