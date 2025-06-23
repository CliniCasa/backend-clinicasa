import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Address } from "../../domain/entities/address.entity";
import { CreateAddressDto } from "../dto/address/create-address.dto";
import { UpdateAddressDto } from "../dto/address/update-address.dto";

@Injectable()
export class AddressService{
    constructor(
        @InjectRepository(Address)
        private readonly addressRepo: Repository<Address>,
    ){}

    create(dto: CreateAddressDto){
        const address = this.addressRepo.create(dto);
        return this.addressRepo.save(address);
    }

    findAll(){
        return this.addressRepo.find();
    }

    findOne(id: number) {
        return this.addressRepo.findOneBy({ id });
    }

    update(id: number, dto: UpdateAddressDto){
        return this.addressRepo.update(id, dto);
    }

    remove(id: number){
        return this.addressRepo.delete(id);
    }
}