import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserStageOrder } from './userStageOrder.entity';
import { Deal } from '../../deal/entities/deal.entity';
import { Pipeline } from 'src/modules/pipeline/entities/pipeline.entity';

@Entity({
  name: 'deal_stage',
})
export class DealStage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, default: 'Name' })
  name: string;

  @Column({ type: 'boolean', nullable: true })
  is_deleted: boolean;

  @Column({ type: 'varchar', length: 7 })
  color: string;

  @Column({ type: 'varchar', length: 255 })
  key: string;

  @Column({ type: 'int' })
  order: number;

  @Column({ type: 'int', nullable: false })
  pipeline_id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Deal, (deal) => deal.orders)
  deals: Deal[];

  @OneToMany(() => UserStageOrder, (userStageOrder) => userStageOrder.dealStage)
  userStageOrders: UserStageOrder[];

  @ManyToOne(() => Pipeline, (pipeline) => pipeline.dealStages)
  @JoinColumn({ name: 'pipeline_id' })
  pipeline: Pipeline;
}
