import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUser } from './user.interface';

@Injectable()
export class UsersService {
  
  private readonly users: IUser[];

  constructor(){
    const saltRounds = 10;
    this.users = [
      {
        id: 1,
        username: 'admin',
        password: bcrypt.hashSync('password123', saltRounds), // Hashea la contraseña
      },
    ];
  }

  async findOne(username: string): Promise<IUser | undefined> {
    return this.users.find((user) => user.username === username);
  }
  
  async create(user: { username: string; password: string }): Promise<IUser> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    const newUser: IUser = {
      id: this.users.length + 1,
      username: user.username,
      password: hashedPassword,
    };
    this.users.push(newUser);
    return newUser;
  }

}