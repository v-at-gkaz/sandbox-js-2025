import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  getAll() {
    return ['one', 'two', 'three'];
  }

  create() {
    return 'success';
  }
}
