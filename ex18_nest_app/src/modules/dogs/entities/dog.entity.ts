import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  the: number;

  @Column({ default: true })
  isActive: boolean;
}
