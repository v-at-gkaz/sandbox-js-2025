import { Entity, PrimaryGeneratedColumn } from 'typeorm';

// FIXME: !
@Entity({ name: 'results' })
export class ResultEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
