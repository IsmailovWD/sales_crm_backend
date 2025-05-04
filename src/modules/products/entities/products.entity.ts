import { DealOrders } from '../../deal/entities/dealOrders.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

const ColumnNumericTransformer = {
  to: (value: number) => value,
  from: (value: string): number => parseFloat(value),
};

@Entity({
  name: 'products',
})
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({
    type: 'decimal',
    precision: 17,
    scale: 3,
    default: 0.0,
    transformer: ColumnNumericTransformer,
  })
  price: string | number;

  @Column({
    type: 'decimal',
    precision: 17,
    scale: 3,
    default: 0.0,
    transformer: ColumnNumericTransformer,
  })
  body_summa: string | number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @OneToMany(() => DealOrders, (dealOrders) => dealOrders.product)
  orders: DealOrders[];
}
