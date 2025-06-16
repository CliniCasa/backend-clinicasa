import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';


export enum TypeProfessional {
  MEDICO = 'Médico',
  ENFERMEIRO = 'Enfermeiro',
  FISIOTERAPEUTA = 'Fisioterapeuta',
  ADMINISTRATIVO = 'Administrativo',
  OUTRO = 'Outro',
}

@Entity({ name: 'professionals' }) 
export class Professional {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  celular: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  cargo: string;

  @Column({
    type: 'enum',
    enum: TypeProfessional,
    nullable: false,
  })
  tipo: TypeProfessional;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}