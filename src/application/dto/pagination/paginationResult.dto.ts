import { ApiProperty } from '@nestjs/swagger';
import { Worker } from '../../../domain/entities/worker.entity';

export class PaginationResultDto {
  @ApiProperty({ type: [Worker] })
  data: Worker[];

  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  lastPage: number;
}