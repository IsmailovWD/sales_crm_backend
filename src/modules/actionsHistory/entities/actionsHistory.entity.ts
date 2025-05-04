import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('actions_history')
export class ActionsHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['create', 'update', 'delete'],
  })
  actions: 'create' | 'update' | 'delete';

  @ManyToOne(() => User, (user) => user.actionsHistory)
  @JoinColumn({ name: 'users_id' })
  users: User;

  @Column('json')
  data: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
