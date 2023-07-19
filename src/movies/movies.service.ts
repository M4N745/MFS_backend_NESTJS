import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movies } from './movie.entity';
import { Repository } from 'typeorm';
import { MoviesFilterDto } from './dto/movies-filter.dto';
import { SortEnum } from './sort.enum';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movies)
    private movieRepository: Repository<Movies>,
  ) {}
  async getItemById(id: number): Promise<Movies> {
    const item = await this.movieRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('not_found.');
    }
    return item;
  }
  async getAll(filterDto: MoviesFilterDto): Promise<Movies[]> {
    const { search, sort = SortEnum.asc } = filterDto;
    const query = this.movieRepository.createQueryBuilder('movie');

    if (search) {
      query.andWhere(
        'LOWER(movie.title) LIKE :search OR LOWER(movie.description) LIKE :search',
        { search: `%${search.toLowerCase()}%` },
      );
    }

    query.orderBy('title', sort);
    try {
      return await query.getMany();
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
