import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { DealStage } from './dealStage.entity';

@Entity('user_stage_order')
export class UserStageOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order: number;

  @Column({
    type: 'int',
  })
  user_id: number;

  @Column({
    type: 'int',
  })
  deal_stage_id: number;

  @ManyToOne(() => DealStage, (dealStage) => dealStage.userStageOrders)
  @JoinColumn({ name: 'deal_stage_id' })
  dealStage: DealStage;

  @ManyToOne(() => User, (user) => user.stage)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
