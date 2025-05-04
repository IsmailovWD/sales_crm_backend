import { ActionsHistory } from '../../actionsHistory/entities/actionsHistory.entity';
import { UserStageOrder } from '../../deal-stage/entities/userStageOrder.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({
  comment: 'User entity',
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    default: '',
    nullable: false,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: '',
    nullable: false,
    select: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: null,
    nullable: true,
  })
  fullName: string | null;

  @Column({
    type: 'varchar',
    length: 255,
    default: null,
    nullable: true,
  })
  email: string | null;

  @Column({
    type: 'decimal',
    default: 0.0,
    nullable: false,
    precision: 17,
    scale: 3,
  })
  salary: string;

  @Column({
    type: 'decimal',
    default: 0.0,
    nullable: false,
    precision: 17,
    scale: 3,
  })
  sales_kpi: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    default: null,
  })
  deletedAt: Date;

  @OneToMany(() => ActionsHistory, (actionsHistory) => actionsHistory.users)
  actionsHistory: ActionsHistory[];

  @OneToMany(() => UserStageOrder, (stage) => stage.user)
  stage: UserStageOrder[];
}
