import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { TaskDto } from '../dto/task.dto';
import { NotFoundException } from '@nestjs/common';

export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  getAllTasks() {
    return this.taskRepository.find();
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return task;
  }

  createTask(body: TaskDto) {
    const newTask = this.taskRepository.create(body);
    return this.taskRepository.save(newTask);
  }

  async updateTask(id: number, changes: TaskDto) {
    const task = await this.findOne(id);
    this.taskRepository.merge(task, changes);
    return this.taskRepository.save(task);
  }

  async deleteTask(id: number) {
    const task = await this.findOne(id);
    return this.taskRepository.delete({ id });
  }
}