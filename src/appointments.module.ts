import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointments } from './domain/entities/appointments.entity';
import { AppointmentsController } from './api/appointments.controller';
import { AppointmentsService } from './application/services/appointments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Appointments])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}