import { ServiceType } from '../enums/service-type.enum';
import { User } from './user.entity';
import { Worker } from './worker.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
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
  @JoinColumn({ name: 'workerId' })
  worker: Worker;

  @Column({ type: 'uuid', nullable: true })
  workerId: string;

  @ManyToOne(() => User, (user) => user.appointments)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'integer', nullable: true })
  userId: number;

  @CreateDateColumn()
  createdAt: Date;
}
