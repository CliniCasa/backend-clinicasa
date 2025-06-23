import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsUUID, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ServiceType } from '../../../domain/enums/service-type.enum';

export class CreateAppointmentDto {
  @ApiProperty({
    description: 'Data e hora do agendamento no formato ISO 8601',
    example: '2025-12-30T14:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    description: 'O serviço específico a ser realizado, escolhido da lista do funcionário',
    enum: ServiceType,
    example: ServiceType.PILATES_CLINICO,
  })
  @IsEnum(ServiceType)
  @IsNotEmpty()
  service: ServiceType;

  @ApiProperty({
    description: 'ID do funcionário que realizará o atendimento (UUID)',
    example: 'a0b1c2d3-e4f5-g6h7-i8j9-k0l1m2n3o4p5',
  })
  @IsUUID()
  @IsNotEmpty()
  workerId: string;

  @ApiProperty({
    description: 'ID numérico do usuário que está agendando', 
    example: 42, 
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
