import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AddressService } from 'src/application/services/address.service';
import { CreateAddressDto } from 'src/application/dto/address/create-address.dto';
import { UpdateAddressDto } from 'src/application/dto/address/update-address.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Address } from 'src/domain/entities/address.entity';

@ApiTags('Addresses')
@Controller('addresses')
export class AddressController {
  constructor(private readonly service: AddressService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo endereço' })
  @ApiResponse({ status: 201, description: 'Endereço criado com sucesso.', type: Address })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() dto: CreateAddressDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os endereços' })
  @ApiResponse({ status: 200, description: 'Lista de endereços retornada com sucesso.', type: [Address] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um endereço pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do endereço (inteiro)' })
  @ApiResponse({ status: 200, description: 'Endereço encontrado.', type: Address })
  @ApiResponse({ status: 404, description: 'Endereço não encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um endereço pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do endereço (inteiro)' })
  @ApiResponse({ status: 200, description: 'Endereço atualizado com sucesso.', type: Address })
  @ApiResponse({ status: 404, description: 'Endereço não encontrado.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAddressDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um endereço pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do endereço (inteiro)' })
  @ApiResponse({ status: 204, description: 'Endereço removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Endereço não encontrado.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
