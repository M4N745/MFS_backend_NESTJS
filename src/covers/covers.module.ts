import { Module } from '@nestjs/common';
import { CoversController } from './covers.controller';
import { CoversService } from './covers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Covers } from './cover.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Covers])],
  controllers: [CoversController],
  providers: [CoversService],
})
export class CoversModule {}
