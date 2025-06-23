import { ServiceType } from '../enums/service-type.enum';
import { User } from './user.entity';
import { Worker } from './worker.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

@Entity('appointments')
export class Appointments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.SCHEDULED,
  })
  status: AppointmentStatus;

  @Column({
    type: 'enum',
    enum: ServiceType,
    nullable: false, 
  })
  service: ServiceType;

  @ManyToOne(() => Worker, (worker) => worker.appointments)
  worker: Worker;

  @ManyToOne(() => User, (user) => user.appointments)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
