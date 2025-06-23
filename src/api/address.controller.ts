import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AddressService } from 'src/application/services/address.service';
import { CreateAddressDto } from 'src/application/dto/address/create-address.dto';
import { UpdateAddressDto } from 'src/application/dto/address/update-address.dto';

@Controller('addresses')
export class AddressController {
  constructor(private readonly service: AddressService) {}

  @Post()
  create(@Body() dto: CreateAddressDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateAddressDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
