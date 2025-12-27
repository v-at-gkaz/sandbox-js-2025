import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { OrderProductEntity } from './order-product.entity';

@Entity({ name: 'orders', schema: 'typeorm' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToMany(() => ProductEntity)
  // @JoinTable({ name: 'order_product' })
  // products: ProductEntity[];

  @ManyToOne(() => CustomerEntity, (customer) => customer.id)
  customer: CustomerEntity;

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.orderId)
  orderProductsBond: OrderProductEntity[];
}
