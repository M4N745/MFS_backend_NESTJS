import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SortEnum } from '../sort.enum';

export class MoviesFilterDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  sort?: SortEnum;
}
