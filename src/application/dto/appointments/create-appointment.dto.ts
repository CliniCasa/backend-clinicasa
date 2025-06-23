import { IsDateString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty()
  @IsUUID()
  workerId: string;
  
  @ApiProperty()
  @IsUUID()
  userId: string; 

  @ApiProperty({ example: '2025-06-27T08:00:00.000Z', description: 'Data e hora exatas do agendamento em formato ISO 8601' })
  @IsDateString()
  date: string;
}