import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { UserStageOrder } from './userStageOrder.entity';
import { Deal } from '../../deal/entities/deal.entity';

@Entity({
  name: 'deal_stage',
})
export class DealStage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, default: 'Name' })
  name: string;

  @Column({ type: 'boolean', nullable: true })
  is_delete: boolean;

  @Column({ type: 'varchar', length: 7 })
  color: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  key: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Deal, (deal) => deal.orders)
  deals: Deal[];

  @OneToMany(() => UserStageOrder, (userStageOrder) => userStageOrder.dealStage)
  userStageOrders: UserStageOrder[];
}
