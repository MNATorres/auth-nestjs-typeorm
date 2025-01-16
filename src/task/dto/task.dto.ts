import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsBoolean, IsOptional, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';

export class TaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  done: boolean;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  userId: number;
}

export class UpdateTaskDto extends PartialType(TaskDto) {}
