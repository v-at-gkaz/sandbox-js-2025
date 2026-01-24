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

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created: Date;

  @Column({ type: 'enum', enum: GameStatus, default: GameStatus.STARTED })
  cellValue: GameStatus;

  @ManyToOne(() => UserEntity, (user) => user.id)
  startedGamer: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  secondGamer: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    nullable: true,
  })
  winner: UserEntity;
}
