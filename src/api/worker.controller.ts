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
  Query,
} from '@nestjs/common';
import { WorkerService } from '../application/services/worker.service';
import { CreateWorkerDto } from '../application/dto/worker/create-worker.dto';
import { UpdateWorkerDto } from '../application/dto/worker/update-worker.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger'; // Importe os decoradores
import { Worker } from '../domain/entities/worker.entity';
import { PaginationDto } from 'src/application/dto/pagination/pagination.dto';
import { PaginationResultDto } from 'src/application/dto/pagination/paginationResult.dto';

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
  @ApiOperation({ summary: 'Listar funcionários com paginação e busca' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número da página' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Itens por página' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Termo de busca por nome' })
  @ApiResponse({ status: 200, description: 'Lista de funcionários paginada.', type: PaginationResultDto }) 
  @ApiResponse({ status: 400, description: 'Parâmetros de paginação inválidos.' })
  findAll(@Query() paginationDto: PaginationDto) { 
    return this.workerService.findAll(paginationDto); 
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um funcionário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do funcionário (formato UUID)' })
  @ApiResponse({ status: 200, description: 'Funcionário encontrado.', type: Worker })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.workerService.findOne(id);
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