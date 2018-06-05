import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ITodo, ITodosService } from './interfaces/index';
import { CreateTodoDto } from './dto/createTodo.dto';
import { debug } from 'console';

@Injectable()
export class TodosService implements ITodosService{
    constructor(@InjectModel('Todo') private readonly todoModel: Model<ITodo>) { }

    async findAll(): Promise<ITodo[]> {
        return await this.todoModel.find().exec();
    }

    async findOne(options: object): Promise<ITodo> {
        return await this.todoModel.findOne(options).exec();
    }

    async findById(ID: number): Promise<ITodo> {
        return await this.todoModel.findById(ID).exec();
    }
    async create(createTodoDto: CreateTodoDto): Promise<ITodo> {
        const createdTodo = new this.todoModel(createTodoDto);
        return await createdTodo.save();
    }

    async update(ID: number, newValue: ITodo): Promise<ITodo> {
        const todo = await this.todoModel.findById(ID).exec();

        if (!todo._id) {
            debug('todo not found');
        }

        await this.todoModel.findByIdAndUpdate(ID, newValue).exec();
        return await this.todoModel.findById(ID).exec();
    }
    async delete(ID: number): Promise<string> {
        try {
            await this.todoModel.findByIdAndRemove(ID).exec();
            return 'The todo has been deleted';
        }
        catch (err){
            debug(err);
            return 'The todo could not be deleted';
        }
    }
}
