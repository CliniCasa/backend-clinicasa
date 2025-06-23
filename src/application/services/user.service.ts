import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    dto.accountType = 'patient'; // fixed user role "Patient" for this initial version of the application

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepo.create({
      ...dto,
      password: hashedPassword, // switches for the hashed password
    });

    return this.userRepo.save(user); // saves the user with address (via cascade)
  }

  findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number): Promise<User> { // Alterado de string para number
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    return user;
  }

  async update(id: number, dto: UpdateUserDto) { // Alterado de string para number
    // Aqui também seria bom adicionar hashing de senha se a senha for alterada
    const user = await this.userRepo.preload({ id, ...dto });
    if (!user) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    return this.userRepo.save(user);
  }

  async remove(id: number): Promise<void> { // Alterado de string para number
    const result = await this.userRepo.delete(id);
    if (result.affected === 0) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
  }
}
