import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TaskDto, UpdateTaskDto } from '../dto/task.dto';
import { TaskService } from '../service/task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('/')
  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  getTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.findOne(id);
  }

  @Post('/')
  createTask(@Body() payload: TaskDto) {
    return this.taskService.createTask(payload);
  }

  @Put('/:id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(id, payload);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.deleteTask(id);
  }
}
