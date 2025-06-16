import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { WorkerRole } from '../../domain/entities/worker.entity';
import { ApiProperty } from '@nestjs/swagger'; 

export class CreateWorkerDto {
  @ApiProperty({
    description: 'O nome completo do funcionário.',
    example: 'Maria da Silva',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'O e-mail único do funcionário.',
    example: 'maria.silva@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'O cargo do funcionário.',
    enum: WorkerRole, 
    example: WorkerRole.ENFERMEIRA,
  })
  @IsEnum(WorkerRole)
  @IsNotEmpty()
  role: WorkerRole;
}