import { DeliveryMan } from '../../deliveryMan/entities/deliveryMan.entity';
import { Contacts } from '../../contacts/entities/contacts.entity';
import { Deal } from '../../deal/entities/deal.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { Products } from '../../products/entities/products.entity';
import { User } from '../../users/entities/user.entity';
import { Pipeline } from 'src/modules/pipeline/entities/pipeline.entity';

@Entity({
  name: 'branch',
  orderBy: {
    createdAt: 'DESC',
  },
  comment: 'Branch',
})
export class Branch {
  @Column({
    type: 'int',
    primary: true,
    nullable: false,
    generated: 'increment',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  image: string | null;

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

  // Join

  @ManyToMany(() => User, (user) => user.branches)
  @JoinTable({
    name: 'user_branches',
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
    joinColumn: { name: 'branch_id', referencedColumnName: 'id' },
  })
  users: User[];

  @OneToMany(() => Contacts, (cb) => cb.branches)
  contacts: Contacts[];

  @OneToMany(() => DeliveryMan, (e) => e.branches)
  deliveryMan: DeliveryMan[];

  @OneToMany(() => Products, (e) => e.branch)
  products: Products[];

  // @OneToMany(() => User, (e) => e.branches)
  // users: User[];

  @OneToMany(() => Pipeline, (e) => e.branch)
  pipeline: Pipeline[];
}
