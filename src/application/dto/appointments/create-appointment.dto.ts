import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({
    description: 'Data e hora do agendamento no formato ISO 8601',
    example: '2025-12-30T14:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    description: 'ID do funcionário que realizará o atendimento',
    example: 'a0b1c2d3-e4f5-g6h7-i8j9-k0l1m2n3o4p5',
  })
  @IsUUID()
  @IsNotEmpty()
  workerId: string;

  @ApiProperty({
    description: 'ID numérico do usuário que está agendando', 
    example: 1, 
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
