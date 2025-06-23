import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Appointments } from './appointments.entity';

@Entity({ name: 'workers' })
export class User {
 
  @OneToMany(() => Appointments, (appointment) => appointment.user)
  appointments: Appointments[]; 
}