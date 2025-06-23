import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('addresses')
export class Address {
  @ApiProperty({ description: 'Identificador único do endereço.', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nome da rua.', example: 'Rua das Flores' })
  @Column()
  street: string;

  @ApiProperty({ description: 'Número do endereço.', example: '123' })
  @Column()
  number: string;

  @ApiProperty({ description: 'Bairro.', example: 'Centro' })
  @Column()
  neighborhood: string;

  @ApiProperty({ description: 'Cidade.', example: 'São Paulo' })
  @Column()
  city: string;

  @ApiProperty({ description: 'Estado.', example: 'SP' })
  @Column()
  state: string;

  @ApiProperty({ description: 'CEP (Código Postal).', example: '01000-000' })
  @Column()
  zipcode: string;

  @ApiProperty({ description: 'Complemento do endereço.', example: 'Apto 101', required: false })
  @Column({ nullable: true })
  complement?: string;
}
