import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professional } from './domain/entities/professional.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Professional])],
  // controllers: [ProfissionaisController],
  // providers: [ProfissionaisService],
})
export class ProfessionalModule {}