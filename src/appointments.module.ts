import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointments } from './domain/entities/appointments.entity';
import { AppointmentsController } from './api/appointments.controller';
import { AppointmentsService } from './application/services/appointments.service';
import { Worker } from './domain/entities/worker.entity';
import { User } from './domain/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointments, Worker, User])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}