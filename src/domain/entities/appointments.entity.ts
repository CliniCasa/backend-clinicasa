// import { User } from 'src/users/entities/user.entity'; 
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

  @ManyToOne(() => Worker, (worker) => worker.appointments)
  worker: Worker;

  @ManyToOne(() => User, (user) => user.appointments)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}