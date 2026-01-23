import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
    unique: true,
  })
  login: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  password: string;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;
}
