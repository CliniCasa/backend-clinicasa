
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

// Importe os enums necessários
import { WorkerRole } from './domain/enums/workerRole.enums';

// --- Dados para a Seed ---

const workersToSeed: Partial<Worker>[] = [
  { name: 'Dr. Carlos Silva', email: 'carlos.silva@clinica.com', role: WorkerRole.FISIOTERAPEUTA }, // Adicionei um role de exemplo
  { name: 'Enf. Ana Paula', email: 'ana.paula@clinica.com', role: WorkerRole.ENFERMEIRA },
  { name: 'Dr. João Pereira', email: 'joao.pereira@clinica.com', role: WorkerRole.FISIOTERAPEUTA },
  { name: 'Maria Souza', email: 'maria.souza@clinica.com', role: WorkerRole.MASSAGISTA },
  { name: 'Dra. Fernanda Costa', email: 'fernanda.costa@clinica.com', role: WorkerRole.PSICOLOGO },
  { name: 'Pedro Almeida', email: 'pedro.almeida@clinica.com', role: WorkerRole.OUTROS },
  { name: 'Enf. Roberta Lima', email: 'roberta.lima@clinica.com', role: WorkerRole.ENFERMEIRA },
];

// Vamos criar usuários com endereços
const usersToSeed = [
  {
    name: 'João Paciente',
    gender: 'Masculino',
    phone: '11987654321',
    email: 'joao.paciente@email.com',
    password: 'Password123!', // Senha em texto plano que será "hasheada"
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


// --- Funções de Seed ---

async function seedWorkers(repo: Repository<Worker>) {
  console.log('Iniciando seed de Workers...');
  for (const data of workersToSeed) {
    const existing = await repo.findOne({ where: { email: data.email } });
    if (!existing) {
      await repo.save(repo.create(data));
      console.log(`Worker '${data.name}' inserido.`);
    } else {
      console.log(`Worker '${data.name}' já existe.`);
    }
  }
}

async function seedUsersAndAddresses(repo: Repository<User>) {
  console.log('Iniciando seed de Users e Addresses...');
  for (const data of usersToSeed) {
    const existing = await repo.findOne({ where: { email: data.email } });
    if (!existing) {
      // Gera o hash da senha antes de salvar
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const userToSave = { ...data, password: hashedPassword };
      // O cascade: true na entidade User salva o endereço automaticamente
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

  // Para garantir uma seed limpa, podemos apagar os agendamentos antigos
  await appointmentRepo.clear();

  // Buscamos os usuários e workers do banco para ter seus IDs
  const users = await userRepo.find();
  const workers = await workerRepo.find();

  if (users.length === 0 || workers.length === 0) {
    console.log('Não há usuários ou workers para criar agendamentos. Pulando.');
    return;
  }
  
  // Data de hoje às 10:00
  let todayAt10 = new Date();
  todayAt10 = setHours(todayAt10, 10);
  todayAt10 = setMinutes(todayAt10, 0);
  todayAt10 = setSeconds(todayAt10, 0);
  todayAt10 = setMilliseconds(todayAt10, 0);

  // Amanhã às 14:00
  let tomorrowAt14 = addDays(new Date(), 1);
  tomorrowAt14 = setHours(tomorrowAt14, 14);
  tomorrowAt14 = setMinutes(tomorrowAt14, 0);
  tomorrowAt14 = setSeconds(tomorrowAt14, 0);
  tomorrowAt14 = setMilliseconds(tomorrowAt14, 0);

  const appointmentsToSeed = [
    // Agendamento de hoje com a primeira usuária e o primeiro worker
    {
      user: users[0],
      worker: workers[0],
      date: todayAt10,
    },
    // Agendamento de amanhã com a segunda usuária e o segundo worker
    {
      user: users[1],
      worker: workers[1],
      date: tomorrowAt14,
    },
    // Agendamento já existente para testar a lógica de conflito
     {
      user: users[1],
      worker: workers[0], // Mesmo worker do primeiro agendamento
      date: todayAt10, // Mesmo horário do primeiro agendamento
    },
  ];

  for (const data of appointmentsToSeed) {
    const newAppointment = appointmentRepo.create(data);
    await appointmentRepo.save(newAppointment);
    console.log(`Agendamento criado para ${data.user.name} com ${data.worker.name} em ${data.date.toLocaleString()}`);
  }
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  // Obter os repositórios diretamente do contexto do app
  const workerRepository = app.get<Repository<Worker>>(getRepositoryToken(Worker));
  const userRepository = app.get<Repository<User>>(getRepositoryToken(User));
  const appointmentRepository = app.get<Repository<Appointments>>(getRepositoryToken(Appointments));

  try {
    // Executar as seeds na ordem de dependência
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