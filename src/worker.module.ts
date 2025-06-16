import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Worker } from './domain/entities/worker.entity';
import { WorkerController } from './api/worker.controller';
import { WorkerService } from './application/services/worker.service';

@Module({
  imports: [TypeOrmModule.forFeature([Worker])],
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule {}