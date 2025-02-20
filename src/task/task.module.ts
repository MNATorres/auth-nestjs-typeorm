import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskEntity } from './entities/task.entity';
import { TaskController } from './controller/task.controller';
import { TaskService } from './service/task.service';
import { User } from './../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, User])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
