import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderProductEntity } from './order-product.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
    unique: false,
  })
  name: string;

  @Column({
    type: 'decimal',
    nullable: true,
    default: null,
  })
  price: number;

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.productId)
  productOrdersBond: OrderProductEntity[];
}
