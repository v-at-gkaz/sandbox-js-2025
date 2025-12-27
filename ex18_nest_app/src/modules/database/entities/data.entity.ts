import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('data_created_at_idx', ['createdAt'], {})
@Index('data_pkey', ['id'], { unique: true })
@Index('data_updated_at_idx', ['updatedAt'], {})
@Entity({ name: 'data', schema: 'public' })
export class DataEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name' })
  name: string;

  @Column('character varying', { name: 'description' })
  description: string;

  @Column('timestamp with time zone', {
    name: 'updated_at',
    default: () => 'now()',
  })
  updatedAt: Date;

  @Column('timestamp with time zone', {
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt: Date;
}
