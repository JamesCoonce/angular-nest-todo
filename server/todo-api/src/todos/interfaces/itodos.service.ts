import { ITodo } from './todos.interface';

export interface ITodosService {
    findAll(): Promise<ITodo[]>;
    findById(ID: number): Promise<ITodo | null>;
    findOne(options: object): Promise<ITodo | null>;
    create(todos: ITodo): Promise<ITodo>;
    update(ID: number, newValue: ITodo): Promise<ITodo | null>;
    delete(ID: number): Promise<string>;
}