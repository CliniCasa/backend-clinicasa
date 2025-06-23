import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Worker } from 'src/domain/entities/worker.entity';
import { WorkerRole } from 'src/domain/enums/workerRole.enums';
import { User } from 'src/domain/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService implements OnModuleInit {
  // O Logger nos ajuda a ver mensagens no console
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Worker)
    private readonly workerRepository: Repository<Worker>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Este método é executado automaticamente quando o módulo é iniciado
  async onModuleInit() {
    this.logger.log('Iniciando verificação do seed de dados...');
    await this.seedUsers();
    await this.seedWorkers();
  }

  private async seedUsers() {
    // Verificar se já existem usuários no banco
    const userCount = await this.userRepository.count();
    if (userCount > 0) {
      this.logger.log('O banco de dados de Users já possui dados. Seed não será executado.');
      return;
    }

    this.logger.log('Populando o banco de dados com Users...');

    // Criar usuário com ID 2 para testes
    const testUser = this.userRepository.create({
      name: 'Usuário Teste',
      email: 'teste@clinicasa.com',
      phone: '11999999999',
      gender: 'Não informado',
      password: 'senha123',
      accountType: 'patient',
    });

    await this.userRepository.save(testUser);
    this.logger.log('Seed de Users concluído com sucesso!');
  }

  private async seedWorkers() {
    // 1. Primeiro, verificamos se já existem workers no banco
    const count = await this.workerRepository.count();
    if (count > 0) {
      this.logger.log('O banco de dados de Workers já possui dados. Seed não será executado.');
      return;
    }

    this.logger.log('Populando o banco de dados com Workers...');

    // 2. Lista de 10 workers para criar
    const workersToCreate = [
      { name: 'Ana Carolina Souza', email: 'ana.souza@clinicasa.com', role: WorkerRole.CUIDADOR },
      { name: 'Bruno Marques', email: 'bruno.marques@clinicasa.com', role: WorkerRole.FISIOTERAPEUTA },
      { name: 'Carla Dias', email: 'carla.dias@clinicasa.com', role: WorkerRole.MASSAGISTA },
      { name: 'Daniel Alves', email: 'daniel.alves@clinicasa.com', role: WorkerRole.MEDICO },
      { name: 'Eduarda Ferreira', email: 'eduarda.ferreira@clinicasa.com', role: WorkerRole.PSICOLOGO },
      { name: 'Fernando Lima', email: 'fernando.lima@clinicasa.com', role: WorkerRole.CUIDADOR },
      { name: 'Gabriela Costa', email: 'gabriela.costa@clinicasa.com', role: WorkerRole.FISIOTERAPEUTA },
      { name: 'Heitor Pereira', email: 'heitor.pereira@clinicasa.com', role: WorkerRole.OUTROS },
      { name: 'Juliana Martins', email: 'juliana.martins@clinicasa.com', role: WorkerRole.CUIDADOR },
      { name: 'Lucas Gonçalves', email: 'lucas.goncalves@clinicasa.com', role: WorkerRole.MEDICO },
    ];

    // 3. Criamos os workers diretamente usando o repositório
    const creationPromises = workersToCreate.map(workerData => {
      const worker = this.workerRepository.create(workerData);
      return this.workerRepository.save(worker);
    });

    // 4. Executamos todas as promessas em paralelo
    await Promise.all(creationPromises);

    this.logger.log('Seed de Workers concluído com sucesso!');
  }
}