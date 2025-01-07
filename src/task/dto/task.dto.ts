import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class TaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  done: boolean;
}

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  done?: boolean;
}
