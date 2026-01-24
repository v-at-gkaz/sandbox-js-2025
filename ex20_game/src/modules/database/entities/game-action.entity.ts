import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GameEntity } from './game.entity';

export enum CellValue {
  KRESTIK = 'X',
  NILOK = '0',
  DEFAULT = '',
}

@Entity({ name: 'game_actions' })
export class GameActionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: null, nullable: true })
  coordX: number;

  @Column({ type: 'int', default: null, nullable: true })
  coordY: number;

  @Column({ type: 'enum', enum: CellValue, default: CellValue.DEFAULT })
  cellValue: CellValue;

  @ManyToOne(() => GameEntity, (game) => game.id)
  game: GameEntity;
}
