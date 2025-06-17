import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  ParseEnumPipe,
} from '@nestjs/common';
import { WorkerService } from '../application/services/worker.service';
import { CreateWorkerDto } from '../application/dto/create-worker.dto';
import { UpdateWorkerDto } from '../application/dto/update-worker.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'; 
import { Worker } from '../domain/entities/worker.entity';
import { WorkerRole } from '../domain/enums/workerRole.enums'; 

@ApiTags('Workers') 
@Controller('workers')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo funcionário' })
  @ApiResponse({ status: 201, description: 'Funcionário criado com sucesso.', type: Worker })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createWorkerDto: CreateWorkerDto) {
    return this.workerService.create(createWorkerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os funcionários' })
  @ApiResponse({ status: 200, description: 'Lista de funcionários retornada com sucesso.', type: [Worker] })
  findAll() {
    return this.workerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um funcionário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do funcionário (formato UUID)' })
  @ApiResponse({ status: 200, description: 'Funcionário encontrado.', type: Worker })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.workerService.findOne(id);
  }

  @Get('role/:role')
  @ApiOperation({ summary: 'Obtém todos os funcionários por cargo' }) 
  @ApiParam({ 
    name: 'role',
    enum: WorkerRole,
    description: 'O cargo do funcionário (ex: ENFERMEIRA, FISIOTERAPEUTA)',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de funcionários com o cargo especificado.',
    type: [Worker], 
  })
  @ApiResponse({ status: 404, description: 'Nenhum funcionário encontrado para este cargo.' })
  async findByRole(@Param('role', new ParseEnumPipe(WorkerRole)) role: WorkerRole): Promise<Worker[]> {
    return this.workerService.findByRole(role);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um funcionário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do funcionário (formato UUID)' })
  @ApiResponse({ status: 200, description: 'Funcionário atualizado com sucesso.', type: Worker })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateWorkerDto: UpdateWorkerDto,
  ) {
    return this.workerService.update(id, updateWorkerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um funcionário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do funcionário (formato UUID)' })
  @ApiResponse({ status: 204, description: 'Funcionário removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.workerService.remove(id);
  }
}