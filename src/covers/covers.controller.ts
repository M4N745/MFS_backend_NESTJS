import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { CoversService } from './covers.service';
import { join } from 'path';
import { createReadStream, statSync } from 'fs';
import { Response } from 'express';

@Controller('covers')
export class CoversController {
  constructor(private coverService: CoversService) {}
  @Get('/:id')
  async getItemById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    const cover = await this.coverService.getItemById(id);
    const file = createReadStream(
      join(process.cwd(), `src/storage/${cover.path}`),
    );
    res.set({
      'Content-Type': 'image/jpeg',
      'Content-Disposition': 'inline; filename=cover1.jpg',
      'Content-Length': statSync(
        join(process.cwd(), `src/storage/${cover.path}`),
      ).size,
    });

    return new StreamableFile(file);
  }
}
