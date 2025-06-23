import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

    // Pipe de validação global
    app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: true, 
    transform: true, 
    }));

    const config = new DocumentBuilder()
    .setTitle('Clínica API')
    .setDescription('Documentação da API para gerenciamento da clínica')
    .setVersion('1.0')
    .addTag('workers', 'Operações relacionadas a funcionários') // Adiciona uma tag para agrupar endpoints
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document); 

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
