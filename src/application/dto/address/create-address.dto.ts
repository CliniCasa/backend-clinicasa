import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    description: 'Nome da rua do endereço.',
    example: 'Rua das Flores',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  street: string;

  @ApiProperty({
    description: 'Número da residência ou local.',
    example: '123A',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  number: string;

  @ApiProperty({
    description: 'Nome do bairro.',
    example: 'Jardim Primavera',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  neighborhood: string;

  @ApiProperty({
    description: 'Cidade do endereço.',
    example: 'São Paulo',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  city: string;

  @ApiProperty({
    description: 'Estado (UF) do endereço.',
    example: 'SP',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  state: string;

  @ApiProperty({
    description: 'Código postal (CEP).',
    example: '01234-567',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  zipcode: string;

  @ApiProperty({
    description: 'Complemento do endereço, se houver.',
    example: 'Apartamento 101',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  complement?: string;
}
