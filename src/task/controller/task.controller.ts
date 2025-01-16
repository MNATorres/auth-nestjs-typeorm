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
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('/')
  @Auth(Role.ADMIN)
  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Get('/:userId')
  @Auth(Role.USER)
  getTasksByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.taskService.getTasksByUser(userId);
  }

  @Get('/:id')
  @Auth(Role.USER)
  getTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.findOne(id);
  }

  @Post('/')
  @Auth(Role.USER)
  createTask(@Body() payload: TaskDto) {
    return this.taskService.createTask(payload);
  }

  @Put('/:id')
  @Auth(Role.USER)
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(id, payload);
  }

  @Delete('/:id')
  @Auth(Role.USER)
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.deleteTask(id);
  }
}
