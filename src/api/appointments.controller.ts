import { Controller, Get, Post, Body, Query, Param, ParseUUIDPipe } from '@nestjs/common';
import { AppointmentsService } from '../application/services/appointments.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CreateAppointmentDto } from '../application/dto/appointments/create-appointment.dto';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get('availability')
  @ApiOperation({ summary: 'Verificar horários disponíveis para um profissional em um dia' })
  @ApiQuery({ name: 'workerId', type: 'string', description: 'ID do profissional (UUID)' })
  @ApiQuery({ name: 'date', type: 'string', description: 'Data desejada (formato AAAA-MM-DD)' })
  @ApiResponse({ status: 200, description: 'Lista de horários disponíveis (ex: ["08:00", "09:00"])' })
  getAvailability(
    @Query('workerId', ParseUUIDPipe) workerId: string,
    @Query('date') date: string,
  ) {
    return this.appointmentsService.getAvailableSlots(workerId, date);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo agendamento' })
  @ApiResponse({ status: 201, description: 'Agendamento criado com sucesso.' })
  @ApiResponse({ status: 409, description: 'Este horário já está ocupado.' }) // Conflict
  @ApiResponse({ status: 404, description: 'Usuário ou Funcionário não encontrado.' })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }
}