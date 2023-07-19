import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesFilterDto } from './dto/movies-filter.dto';
import { Movies } from './movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}
  @Get()
  async getAll(@Query() filterDto: MoviesFilterDto): Promise<Movies[]> {
    return this.moviesService.getAll(filterDto);
  }

  @Get('/:id')
  async getItemById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Movies> {
    return this.moviesService.getItemById(id);
  }
}
