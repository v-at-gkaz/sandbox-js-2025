import { Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get('all')
  getAll() {
    return this.catsService.getAll();
  }

  @Get()
  getAllV2() {
    return this.catsService.getAll();
  }

  @Post()
  create() {
    return this.catsService.create();
  }
}
