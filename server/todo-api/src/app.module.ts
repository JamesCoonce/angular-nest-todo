import { Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosController } from './todos/todos.controller';
import { TodosService } from './todos/todos.service';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    TodosModule],
})
export class AppModule {}
