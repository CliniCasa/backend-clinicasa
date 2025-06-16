import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { WorkerRole } from '../../domain/entities/worker.entity';

export class CreateWorkerDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsEmail() 
  @IsNotEmpty()
  email: string;

  @IsEnum(WorkerRole) 
  @IsNotEmpty()
  role: WorkerRole;
}