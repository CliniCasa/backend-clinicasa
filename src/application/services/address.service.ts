import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Address } from "src/domain/entities/address.entity";
import { CreateAddressDto } from "../dto/address/create-address.dto";
import { UpdateAddressDto } from "../dto/address/update-address.dto";

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
  ) {}

  async create(dto: CreateAddressDto) {
    const address = this.addressRepo.create(dto);
    return await this.addressRepo.save(address);
  }

  async findAll() {
    return await this.addressRepo.find();
  }

  async findOne(id: number) {
    const address = await this.addressRepo.findOneBy({ id });
    if (!address) {
      throw new NotFoundException(`Endereço com ID ${id} não encontrado`);
    }
    return address;
  }

  async update(id: number, dto: UpdateAddressDto) {
    await this.addressRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.addressRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Endereço com ID ${id} não encontrado`);
    }
    return { message: 'Endereço removido com sucesso' };
  }
}
