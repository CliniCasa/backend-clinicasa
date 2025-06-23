import { ApiProperty } from '@nestjs/swagger'; 
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Appointments } from './appointments.entity';
import { WorkerRole } from '../enums/workerRole.enums'; 
import { ServiceType } from '../enums/service-type.enum';

@Entity({ name: 'workers' })
export class Worker {
  @ApiProperty({
    description: 'O ID único do funcionário (gerado automaticamente)',
    example: 'a0b1c2d3-e4f5-g6h7-i8j9-k0l1m2n3o4p5',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'O nome completo do funcionário',
    example: 'Joana Darc',
  })
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @ApiProperty({
    description: 'O e-mail único do funcionário',
    example: 'joana.darc@clinica.com',
  })
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @ApiProperty({
    description: 'O cargo do funcionário',
    enum: WorkerRole,
    default: WorkerRole.CUIDADOR,
  })
  @Column({
    type: 'enum',
    enum: WorkerRole,
    default: WorkerRole.CUIDADOR,
  })
  role: WorkerRole;

  @OneToMany(() => Appointments, (appointments) => appointments.worker)
  appointments: Appointments[]; 
}