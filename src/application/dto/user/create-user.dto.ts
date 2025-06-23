import { CreateAddressDto } from "../address/create-address.dto";

export class CreateUserDto {
  name: string;
  gender: string;
  phone: string;
  email: string;
  password: string;
  accountType?: string;
  //nested field address for the relationship with address
  address: CreateAddressDto;
}
