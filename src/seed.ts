import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { addDays, setHours, setMinutes, setSeconds, setMilliseconds } from 'date-fns';

// Importe todas as suas entidades
import { Worker } from './domain/entities/worker.entity';
import { User } from './domain/entities/user.entity';
import { Address } from './domain/entities/address.entity';
import { Appointments } from './domain/entities/appointments.entity';

import { WorkerRole } from './domain/enums/workerRole.enums';
import { ServiceType } from './domain/enums/service-type.enum';

// --- DADOS DE WORKER ATUALIZADOS ---
const workersToSeed: Partial<Worker>[] = [
  {
    name: 'Dr. Carlos Silva',
    email: 'carlos.silva@clinica.com',
    role: WorkerRole.FISIOTERAPEUTA,
    description: 'Fisioterapeuta com 5 anos de experiência em reabilitação motora.',
    services: [ServiceType.FISIOTERAPIA_MOTORA, ServiceType.PILATES_CLINICO],
  },
  {
    name: 'Ana Paula',
    email: 'ana.paula@clinica.com',
    role: WorkerRole.CUIDADOR,
    description: 'Cuidadora dedicada a cuidados domiciliares e aplicação de medicamentos.',
    services: [ServiceType.APLICACAO_INJECAO, ServiceType.CURATIVO, ServiceType.AFERICAO_PRESSAO],
  },
  {
    name: 'Dr. João Pereira',
    email: 'joao.pereira@clinica.com',
    role: WorkerRole.FISIOTERAPEUTA,
    description: 'Especialista em fisioterapia respiratória para todas as idades.',
    services: [ServiceType.FISIOTERAPIA_RESPIRATORIA],
  },
  {
    name: 'Maria Souza',
    email: 'maria.souza@clinica.com',
    role: WorkerRole.MASSAGISTA,
    description: 'Massagista certificada em técnicas de relaxamento e drenagem.',
    services: [ServiceType.MASSAGEM_RELAXANTE, ServiceType.DRENAGEM_LINFATICA],
  },
  {
    name: 'Dra. Fernanda Costa',
    email: 'fernanda.costa@clinica.com',
    role: WorkerRole.PSICOLOGO,
    description: 'Psicóloga com foco em terapia cognitivo-comportamental.',
    services: [ServiceType.SESSAO_TERAPIA_INDIVIDUAL],
  },
  // --- MUDANÇA FINAL ABAIXO ---
  {
    name: 'Pedro Almeida',
    email: 'pedro.almeida@clinica.com',
    role: WorkerRole.OUTROS,
    description: 'Profissional para atividades de transporte e suporte.',
    services: [ServiceType.TRANSPORTE_PACIENTE, ServiceType.ACOMPANHAMENTO_CONSULTA], // <-- SERVIÇOS ATRIBUÍDOS
  },
];

const usersToSeed = [
    {
        name: 'João Paciente',
        gender: 'Masculino',
        phone: '11987654321',
        email: 'joao.paciente@email.com',
        password: 'Password123!',
        address: {
            street: 'Rua das Flores', number: '123', neighborhood: 'Centro',
            city: 'São Paulo', state: 'SP', zipcode: '01001-000'
        },
    },
    {
        name: 'Ana Paciente',
        gender: 'Feminino',
        phone: '21912345678',
        email: 'ana.paciente@email.com',
        password: 'Password123!',
        address: {
            street: 'Avenida Principal', number: '456', neighborhood: 'Jardins',
            city: 'São Paulo', state: 'SP', zipcode: '01414-000'
        },
    },
];

// Função de correção para dados antigos (ainda útil por segurança)
async function corrigirWorkersComDadosNulos(repo: Repository<Worker>) {
  console.log('Verificando e corrigindo Workers com dados nulos...');
  await repo.query("UPDATE workers SET services = '{}' WHERE services IS NULL");
  console.log('Correção de Workers concluída.');
}


async function seedWorkers(repo: Repository<Worker>) {
  console.log('Iniciando seed de Workers...');
  for (const data of workersToSeed) {
    const existing = await repo.findOne({ where: { email: data.email } });
    if (!existing) {
      await repo.save(repo.create(data));
      console.log(`Worker '${data.name}' inserido.`);
    } else {
      await repo.update({ id: existing.id }, data);
      console.log(`Worker '${data.name}' já existe. Dados atualizados.`);
    }
  }
}

async function seedUsersAndAddresses(repo: Repository<User>) {
    console.log('Iniciando seed de Users e Addresses...');
    for (const data of usersToSeed) {
      const existing = await repo.findOne({ where: { email: data.email } });
      if (!existing) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const userToSave = { ...data, password: hashedPassword };
        await repo.save(repo.create(userToSave));
        console.log(`User '${data.name}' inserido.`);
      } else {
        console.log(`User '${data.name}' já existe.`);
      }
    }
  }
  
  async function seedAppointments(
    appointmentRepo: Repository<Appointments>,
    userRepo: Repository<User>,
    workerRepo: Repository<Worker>,
  ) {
    console.log('Iniciando seed de Appointments...');
    await appointmentRepo.clear();
  
    const users = await userRepo.find();
    const workers = await workerRepo.find({ order: { name: 'ASC' } });
  
    if (users.length < 2 || workers.length < 2) {
      console.log('Não há usuários ou workers suficientes para criar agendamentos. Pulando.');
      return;
    }
    
    let todayAt10 = setHours(setMinutes(setSeconds(setMilliseconds(new Date(), 0), 0), 0), 10);
    let tomorrowAt14 = setHours(setMinutes(setSeconds(setMilliseconds(addDays(new Date(), 1), 0), 0), 0), 14);
  
    const appointmentsToSeed = [
      {
        user: users[0],
        worker: workers.find(w => w.email === 'carlos.silva@clinica.com')!,
        date: todayAt10,
        service: ServiceType.PILATES_CLINICO,
      },
      {
        user: users[1],
        worker: workers.find(w => w.email === 'ana.paula@clinica.com')!,
        date: tomorrowAt14,
        service: ServiceType.CURATIVO, 
      },
      {
        user: users[1],
        worker: workers.find(w => w.email === 'carlos.silva@clinica.com')!,
        date: todayAt10,
        service: ServiceType.FISIOTERAPIA_MOTORA,
      },
    ];
  
    for (const data of appointmentsToSeed) {
      if (!data.worker) {
          console.warn(`Worker não encontrado para o agendamento, pulando.`);
          continue;
      }
      const newAppointment = appointmentRepo.create(data);
      await appointmentRepo.save(newAppointment);
      console.log(`Agendamento criado para ${data.user.name} com ${data.worker.name} em ${data.date.toLocaleString()}`);
    }
  }
  
  async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
  
    const workerRepository = app.get<Repository<Worker>>(getRepositoryToken(Worker));
    const userRepository = app.get<Repository<User>>(getRepositoryToken(User));
    const appointmentRepository = app.get<Repository<Appointments>>(getRepositoryToken(Appointments));
  
    try {
      console.log('--- INICIANDO SEED ---');
      await corrigirWorkersComDadosNulos(workerRepository);
      
      await seedWorkers(workerRepository);      
      await seedUsersAndAddresses(userRepository);
      await seedAppointments(appointmentRepository, userRepository, workerRepository);
      
      console.log('✅ Seed concluída com sucesso!');
    } catch (error) {
      console.error('❌ Erro durante a execução da seed:', error);
    } finally {
      await app.close();
    }
  }
  
  bootstrap();
