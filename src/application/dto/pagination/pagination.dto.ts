import { IsInt, IsOptional, IsString, Min } from "class-validator";
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;
}