import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Covers } from './cover.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoversService {
  constructor(
    @InjectRepository(Covers) private coverRepository: Repository<Covers>,
  ) {}

  async getItemById(id: number) {
    const item = await this.coverRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('not_found');
    }
    return item;
  }
}
