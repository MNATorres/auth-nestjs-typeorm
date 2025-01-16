import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { TaskEntity } from '../entities/task.entity';
import { TaskDto, UpdateTaskDto } from '../dto/task.dto';
import { User } from './../../users/entities/user.entity';
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  getAllTasks() {
    return this.taskRepository.find({
      relations: ['user'],
    });
  }

  getTasksByUser(userId: number) {
    return this.taskRepository.find({
      where: { user: { id: userId } },
    });
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task #${id} not found`);
    }
    return task;
  }

  async createTask(body: TaskDto): Promise<TaskEntity> {
    const newTask = this.taskRepository.create(body);
    const user = await this.userRepository.findOne({
      where: { id: body.userId },
    });

    if (!user) {
      throw new NotFoundException(`User #${body.userId} not found`);
    }
    newTask.user = user;

    return this.taskRepository.save(newTask);
  }

  async updateTask(id: number, changes: UpdateTaskDto) {
    const task = await this.findOne(id);

    this.taskRepository.merge(task, changes);
    return this.taskRepository.save(task);
  }

  async deleteTask(id: number) {
    const task = await this.findOne(id);
    return this.taskRepository.delete({ id });
  }
}
