import { Injectable } from '@nestjs/common';
import { IUser } from './user.interface';

@Injectable()
export class UsersService {
  private readonly users: IUser[] = [
    {
      id: 1,
      username: 'admin',
      password: 'password123', // En producción, usa bcrypt para hashear contraseñas
    },
  ];

  async findOne(username: string): Promise<IUser | undefined> {
    return this.users.find((user) => user.username === username);
  }
}