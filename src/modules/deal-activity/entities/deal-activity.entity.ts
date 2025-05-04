import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Deal } from '../../deal/entities/deal.entity';
import { User } from '../../users/entities/user.entity';
import { DeliveryMan } from 'src/modules/deliveryMan/entities/deliveryMan.entity';

export enum DealActivityType {
  NOTE = 'NOTE',
  COMMENT = 'COMMENT',
  TASK = 'TASK',
  STAGE_CHANGE = 'STAGE_CHANGE',
  EDIT = 'EDIT',
  ACTION = 'ACTION',
}

@Entity('deal_activities')
export class DealActivity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  deal_id: number;

  @ManyToOne(() => Deal, (deal) => deal.activities)
  @JoinColumn({ name: 'deal_id' })
  deal: Deal;

  @Column({ nullable: false })
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar' })
  type: DealActivityType;

  @Column({ type: 'jsonb', nullable: false })
  metadata: Record<string, any>;

  @Column({ type: 'boolean', default: false })
  is_pin: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date | null;
}
