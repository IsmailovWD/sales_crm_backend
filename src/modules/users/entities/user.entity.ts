import { Branch } from '../../branch/entities/branch.entity';
import { UserStageOrder } from '../../deal-stage/entities/userStageOrder.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

const ColumnNumericTransformer = {
  to: (value: string) => value,
  from: (value: string): number => parseFloat(value),
};

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
    transformer: ColumnNumericTransformer,
  })
  salary: string | number;

  @Column({
    type: 'decimal',
    default: 0.0,
    nullable: false,
    precision: 17,
    scale: 3,
    transformer: ColumnNumericTransformer,
  })
  sales_kpi: string | number;

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

  // join fields
  @ManyToMany(() => Branch, (branch) => branch.users)
  @JoinTable({
    name: 'user_branches',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'branch_id', referencedColumnName: 'id' },
  })
  branches: Branch[];

  @OneToMany(() => UserStageOrder, (stage) => stage.user)
  stage: UserStageOrder[];
}
