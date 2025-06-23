import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Worker } from '../../domain/entities/worker.entity';
import { CreateWorkerDto } from '../dto/worker/create-worker.dto';
import { UpdateWorkerDto } from '../dto/worker/update-worker.dto';
import { PaginationDto } from '../dto/pagination/pagination.dto';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  lastPage: number;
}

@Injectable()
export class WorkerService {
  constructor(
    @InjectRepository(Worker)
    private readonly workerRepository: Repository<Worker>,
  ) {}

  async create(createWorkerDto: CreateWorkerDto): Promise<Worker> {
    const { email } = createWorkerDto;
    const existingWorker = await this.workerRepository.findOneBy({ email });

    if (existingWorker) {
      throw new ConflictException(`Já existe um funcionário cadastrado com o e-mail: ${email}`);
    }

    const worker = this.workerRepository.create(createWorkerDto);
    return this.workerRepository.save(worker);
  }


  async findAll(query: PaginationDto): Promise<PaginatedResult<Worker>> {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    const [data, total] = await this.workerRepository.findAndCount({
      where: search ? { name: Like(`%${search}%`) } : {}, 
      take: limit,
      skip,
      order: { name: 'ASC' },
    });

    const lastPage = Math.ceil(total / limit);
    
    return {
      data,
      total,
      page,
      lastPage,
    };
  }

  async update(id: string, updateWorkerDto: UpdateWorkerDto): Promise<Worker> {
    const worker = await this.workerRepository.preload({
      id,
      ...updateWorkerDto,
    });
    if (!worker) {
      throw new NotFoundException(`Worker with ID "${id}" not found`);
    }
    return this.workerRepository.save(worker);
  }

  async findOne(id: string): Promise<Worker> {
    const worker = await this.workerRepository.findOneBy({ id });
    if (!worker) {
      throw new NotFoundException(`Worker with ID "${id}" not found`);
    }
    return worker;
  }

  async remove(id: string): Promise<void> {
    const worker = await this.findOne(id);
    await this.workerRepository.remove(worker);
  }
}