import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

export enum WorkerRole {
  ENFERMEIRA = 'Enfermeira',
  MASSAGISTA = 'Massagista',
  FISIOTERAPEUTA = 'Fisioterapeuta',
  PSICOLOGO = 'Psicólogo',
  OUTROS = 'Outros',
}

@Entity({ name: 'workers' })
export class Worker {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({
    type: 'enum',
    enum: WorkerRole,
    default: WorkerRole.ENFERMEIRA, 
  })
  role: WorkerRole;
}