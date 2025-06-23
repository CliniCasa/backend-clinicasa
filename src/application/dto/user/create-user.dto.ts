import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAddressDto } from '../address/create-address.dto';

export class CreateUserDto {
  @ApiProperty({ example: 'João Silva', description: 'Nome completo do usuário' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Masculino', description: 'Gênero do usuário' })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({ example: '(11) 91234-5678', description: 'Telefone para contato' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'joao@email.com', description: 'E-mail do usuário' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'senhaSegura123', description: 'Senha de acesso' })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'Patient', description: 'Tipo da conta (ex: Patient)', required: false })
  @IsOptional()
  @IsString()
  accountType?: string;

  @ApiProperty({
    description: 'Endereço do usuário',
    type: CreateAddressDto,
    required: true,
  })
  @ValidateNested()
  @Type(() => CreateAddressDto)
  @IsNotEmpty()
  address: CreateAddressDto;
}
