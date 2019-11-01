import { Document } from 'mongoose';

export interface ITodo extends Document {
    readonly text: string;
    readonly complete: boolean;
    readonly dueDate: Date;
}