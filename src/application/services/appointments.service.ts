// src/appointments/appointments.service.ts
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointments } from '../../domain/entities/appointments.entity';
import { Between, Repository } from 'typeorm';
import { CreateAppointmentDto } from '../dto/appointments/create-appointment.dto';  
import { format, startOfDay, endOfDay } from 'date-fns';

const PRE_DEFINED_SLOTS = [
  '08:00', '09:00', '10:00', '11:00',
  '14:00', '15:00', '16:00', '17:00', '18:00',
];

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointments)
    private readonly appointmentRepository: Repository<Appointments>,
  ) {}

  async getAvailableSlots(workerId: string, date: string): Promise<string[]> {
    const requestedDate = new Date(date);

    // 1. Buscar no banco todos os agendamentos para o worker no dia solicitado
    const appointments = await this.appointmentRepository.find({
      where: {
        worker: { id: workerId },
        date: Between(startOfDay(requestedDate), endOfDay(requestedDate)),
      },
    });

    // 2. Extrair apenas as horas dos agendamentos existentes (ex: "08:00", "14:00")
    const bookedSlots = appointments.map(app => format(app.date, 'HH:mm'));

    // 3. Filtrar a lista de horários pré-definidos, removendo os que já estão agendados
    const availableSlots = PRE_DEFINED_SLOTS.filter(
      slot => !bookedSlots.includes(slot),
    );

    return availableSlots;
  }

//   async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointments> {
//     const { workerId, userId, date } = createAppointmentDto;

//     const appointmentDate = new Date(date);

//     // CRÍTICO: Verificar se o horário já não foi agendado por outra pessoa
//     // enquanto o usuário estava na tela.
//     const existingAppointment = await this.appointmentRepository.findOne({
//       where: {
//         worker: { id: workerId },
//         date: appointmentDate,
//       },
//     });

//     if (existingAppointment) {
//       throw new ConflictException('Este horário não está mais disponível.');
//     }

//     // Se estiver livre, cria o agendamento
//     const newAppointment = this.appointmentRepository.create({
//       date: appointmentDate,
//       worker: { id: workerId }, // TypeORM é inteligente o suficiente para lidar com isso
//       user: { id: userId },
//     });

//     return this.appointmentRepository.save(newAppointment);
//   }
}