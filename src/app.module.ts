import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkerModule } from './worker.module';
import { AddressModule } from './address.module';
import { UserModule } from './user.module';
import { AppointmentsModule } from './appointments.module';
import { AuthModule } from './auth/auth.module';
import { SeedService } from './seed';
import { Worker } from './domain/entities/worker.entity';
import { User } from './domain/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    TypeOrmModule.forFeature([Worker, User]),
    WorkerModule,
    AddressModule,
    UserModule,
    AppointmentsModule, 
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule {}