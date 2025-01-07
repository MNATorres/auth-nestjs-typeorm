import { IsString, IsBoolean } from 'class-validator';

export class TaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  done: boolean;
}
