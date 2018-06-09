import { IUser } from './user.interface';

export interface IUsersService {
    findAll(): Promise<IUser[]>;
    findById(ID: number): Promise<IUser | null>;
    findOne(options: object): Promise<IUser | null>;
    create(user: IUser): Promise<IUser>;
    update(ID: number, newValue: IUser): Promise<IUser | null>;
    delete(ID: number): Promise<string>;
}