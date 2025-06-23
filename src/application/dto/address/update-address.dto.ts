import { PartialType } from '@nestjs/swagger'; // Substituímos @nestjs/mapped-types
import { CreateAddressDto } from './create-address.dto';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
