import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

export enum GameStatus {
  STARTED = 'started',
  FINISHED = 'finished',
}

@Entity({ name: 'games' })
export class GameEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  name: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created: Date;

  @Column({ type: 'enum', enum: GameStatus, default: GameStatus.STARTED })
  status: GameStatus;

  @ManyToOne(() => UserEntity, (user) => user.id)
  firstGamer: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  secondGamer: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    nullable: true,
  })
  winner: UserEntity;
}
