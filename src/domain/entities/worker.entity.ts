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

  // 2. Adicionar a nova coluna de serviços
  @ApiProperty({
    description: 'A lista de serviços que o funcionário está habilitado a realizar',
    enum: ServiceType,
    isArray: true,
    example: [ServiceType.APLICACAO_INJECAO, ServiceType.CURATIVO],
  })
  @Column({
    type: 'enum',
    enum: ServiceType,
    array: true, // Isso define a coluna como um array
    nullable: false,
    default: [], // Define um array vazio como padrão
  })
  services: ServiceType[];

  @ApiProperty({
    description: 'Uma breve descrição ou biografia do funcionário',
    example: 'Enfermeira chefe com 10 anos de experiência em cuidados intensivos.',
    required: false, // Indica que o campo é opcional na documentação da API
  })
  @Column({
    type: 'text', // 'text' é ideal para textos longos
    nullable: true, // A descrição é opcional
  })
  description: string;

  @OneToMany(() => Appointments, (appointments) => appointments.worker)
  appointments: Appointments[]; 
}