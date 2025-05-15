import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Index,
  JoinColumn,
} from 'typeorm';
import { Deal } from '../../deal/entities/deal.entity';
import { Products } from '../../products/entities/products.entity';

const transformPrice = {
  to: (value: number) => value,
  from: (value: string): number => parseFloat(value),
};

@Entity('deal_orders')
@Index('IDX_DEAL_PRODUCT', ['deal', 'product'])
export class DealOrders {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  deal_id: number;

  @Column()
  product_id: number;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2, transformer: transformPrice })
  price: number;

  @Column('decimal', { precision: 10, scale: 2, transformer: transformPrice })
  summa: number;

  @ManyToOne(() => Deal, (deal) => deal.orders, { nullable: false })
  @JoinColumn({ name: 'deal_id' })
  deal: Deal;

  @ManyToOne(() => Products, (product) => product.orders, {
    nullable: false,
  })
  @JoinColumn({ name: 'product_id' })
  product: Products;
}
