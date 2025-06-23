import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Worker } from 'src/domain/entities/worker.entity';
import { WorkerRole } from 'src/domain/enums/workerRole.enums';
import { Repository } from 'typeorm';
import { WorkerService } from './application/services/worker.service';

@Injectable()
export class SeedService implements OnModuleInit {
  // O Logger nos ajuda a ver mensagens no console
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private readonly workerService: WorkerService,
    @InjectRepository(Worker)
    private readonly workerRepository: Repository<Worker>,
  ) {}

  // Este método é executado automaticamente quando o módulo é iniciado
  async onModuleInit() {
    this.logger.log('Iniciando verificação do seed de dados...');
    await this.seedWorkers();
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
      { name: 'Ana Carolina Souza', email: 'ana.souza@clinicasa.com', role: WorkerRole.CUIDADOR, description: 'Cuidadora com 5 anos de experiência em geriatria.' },
      { name: 'Bruno Marques', email: 'bruno.marques@clinicasa.com', role: WorkerRole.FISIOTERAPEUTA, description: 'Fisioterapeuta ortopédico especializado em reabilitação pós-cirúrgica.' },
      { name: 'Carla Dias', email: 'carla.dias@clinicasa.com', role: WorkerRole.MASSAGISTA, description: 'Massoterapeuta com foco em shiatsu e massagem relaxante.' },
      { name: 'Daniel Alves', email: 'daniel.alves@clinicasa.com', role: WorkerRole.MEDICO, description: 'Clínico geral com atendimento focado em visitas domiciliares.' },
      { name: 'Eduarda Ferreira', email: 'eduarda.ferreira@clinicasa.com', role: WorkerRole.PSICOLOGO, description: 'Psicóloga com abordagem em terapia cognitivo-comportamental.' },
      { name: 'Fernando Lima', email: 'fernando.lima@clinicasa.com', role: WorkerRole.CUIDADOR, description: 'Acompanhante hospitalar e cuidador de idosos.' },
      { name: 'Gabriela Costa', email: 'gabriela.costa@clinicasa.com', role: WorkerRole.FISIOTERAPEUTA, description: 'Especialista em fisioterapia respiratória para pacientes acamados.' },
      { name:
      'Heitor Pereira', email: 'heitor.pereira@clinicasa.com', role: WorkerRole.OUTROS, description: 'Motorista para transporte de pacientes com mobilidade reduzida.' },
      { name: 'Juliana Martins', email: 'juliana.martins@clinicasa.com', role: WorkerRole.CUIDADOR, description: 'Técnica de enfermagem atuando como cuidadora.' },
      { name: 'Lucas Gonçalves', email: 'lucas.goncalves@clinicasa.com', role: WorkerRole.MEDICO, description: 'Médico recém-formado para consultas de rotina e emissão de atestados.' },
    ];

    // 3. Criamos uma "promessa" para cada worker
    // Usamos o WorkerService para garantir que validações e lógicas (como hash de senha, se houver) sejam aplicadas.
    const creationPromises = workersToCreate.map(workerData =>
      this.workerService.create(workerData)
    );

    // 4. Executamos todas as promessas em paralelo
    await Promise.all(creationPromises);

    this.logger.log('Seed de Workers concluído com sucesso!');
  }
}