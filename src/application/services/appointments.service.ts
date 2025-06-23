// src/appointments/appointments.service.ts
import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointments } from '../../domain/entities/appointments.entity';
import { Between, Repository } from 'typeorm';
import { CreateAppointmentDto } from '../dto/appointments/create-appointment.dto';  
import { format, startOfDay, endOfDay } from 'date-fns';
import { User } from '../../domain/entities/user.entity';
import { Worker } from '../../domain/entities/worker.entity';

const PRE_DEFINED_SLOTS = [
  '08:00', '09:00', '10:00', '11:00',
  '14:00', '15:00', '16:00', '17:00', '18:00',
];

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointments)
    private readonly appointmentRepository: Repository<Appointments>,
    // 3. Injetar os repositórios de Worker e User
    @InjectRepository(Worker)
    private readonly workerRepository: Repository<Worker>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAvailableSlots(workerId: string, date: string): Promise<string[]> {
    const requestedDate = new Date(date);

    const appointments = await this.appointmentRepository.find({
      where: {
        worker: { id: workerId },
        date: Between(startOfDay(requestedDate), endOfDay(requestedDate)),
      },
    });

    const bookedSlots = appointments.map(app => format(app.date, 'HH:mm'));

    const availableSlots = PRE_DEFINED_SLOTS.filter(
      slot => !bookedSlots.includes(slot),
    );

    return availableSlots;
  }

  // --- MÉTODO CREATE ATUALIZADO ---
  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointments> {
    const { workerId, userId, date, service } = createAppointmentDto;

    // 4. Buscar as entidades completas de Worker e User
    const worker = await this.workerRepository.findOneBy({ id: workerId });
    if (!worker) {
      throw new NotFoundException(`Worker com ID "${workerId}" não encontrado.`);
    }

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User com ID "${userId}" não encontrado.`);
    }
    
    // 5. VALIDAÇÃO PRINCIPAL: Verificar se o serviço está na lista de serviços do funcionário
    if (!worker.services.includes(service)) {
      throw new BadRequestException(
        `O serviço "${service}" selecionado não é realizado por este funcionário.`,
      );
    }
    
    // 6. Manter sua validação original de conflito de horário
    const appointmentDate = new Date(date);
    const existingAppointment = await this.appointmentRepository.findOne({
      where: {
        worker: { id: workerId },
        date: appointmentDate,
      },
    });

    if (existingAppointment) {
      throw new ConflictException('Este horário não está mais disponível.');
    }

    // 7. Se tudo estiver correto, criar o agendamento com as entidades e o serviço
    const newAppointment = this.appointmentRepository.create({
      date: appointmentDate,
      service, 
      worker,  
      user,    
    });

    return this.appointmentRepository.save(newAppointment);
  }
}
