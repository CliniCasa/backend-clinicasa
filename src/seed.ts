import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WorkerService } from './application/services/worker.service';
import { WorkerRole } from './domain/enums/workerRole.enums';
import { Worker } from './domain/entities/worker.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const workerService = app.get(WorkerService);

  const workersToSeed: Partial<Worker>[] = [
    { name: 'Dr. Carlos Silva', email: 'carlos.silva@clinica.com', role: WorkerRole.MEDICO },
    { name: 'Enf. Ana Paula', email: 'ana.paula@clinica.com', role: WorkerRole.ENFERMEIRA },
    { name: 'Dr. João Pereira', email: 'joao.pereira@clinica.com', role: WorkerRole.FISIOTERAPEUTA },
    { name: 'Maria Souza', email: 'maria.souza@clinica.com', role: WorkerRole.MASSAGISTA },
    { name: 'Dra. Fernanda Costa', email: 'fernanda.costa@clinica.com', role: WorkerRole.PSICOLOGO },
    { name: 'Pedro Almeida', email: 'pedro.almeida@clinica.com', role: WorkerRole.OUTROS },
    { name: 'Enf. Roberta Lima', email: 'roberta.lima@clinica.com', role: WorkerRole.ENFERMEIRA },
    { name: 'Dra. Laura Dias', email: 'laura.dias@clinica.com', role: WorkerRole.MEDICO },
  ];

  console.log('Iniciando seed de Workers...');

  for (const workerData of workersToSeed) {
    try {
      // Verifica se o worker já existe pelo email antes de inserir
      const existingWorker = await workerService['workerRepository'].findOne({
        where: { email: workerData.email },
      });

      if (!existingWorker) {
        // Crie uma nova instância da entidade e salve-a
        const newWorker = workerService['workerRepository'].create(workerData);
        await workerService['workerRepository'].save(newWorker);
        console.log(`Worker '${workerData.name}' inserido com sucesso.`);
      } else {
        console.log(`Worker '${workerData.name}' já existe. Pulando.`);
      }
    } catch (error) {
      console.error(`Erro ao inserir worker '${workerData.name}':`, error.message);
    }
  }

  console.log('Seed de Workers concluído.');
  await app.close();
}

bootstrap();