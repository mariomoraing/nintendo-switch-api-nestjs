export interface IUser {
    id: number;
    username: string;
    password: string;
}

export type IUserWithoutPassword = Omit<IUser, 'password'>;