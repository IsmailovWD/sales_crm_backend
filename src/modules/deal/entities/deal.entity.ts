import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { DealStage } from '../../deal-stage/entities/dealStage.entity';
import { Contacts } from '../../contacts/entities/contacts.entity';
import { DealOrders } from './dealOrders.entity';
import { DealActivity } from '../../deal-activity/entities/deal-activity.entity';
import { DeliveryMan } from 'src/modules/deliveryMan/entities/deliveryMan.entity';

const ColumnNumericTransformer = {
  to: (value: number) => value,
  from: (value: string): number => parseFloat(value),
};

@Entity('deal')
// @Index('IDX_DEAL_DealStage_CONTACT', ['deal_stage', 'contact'])
export class Deal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column()
  stage_id: number;

  @Column()
  contact_id: number;

  @Column('text', { array: true, default: [] })
  tags: string[];

  @Column({
    type: 'decimal',
    precision: 17,
    scale: 3,
    default: 0.0,
    transformer: ColumnNumericTransformer,
  })
  summa: string | number;

  // timestamps
  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;

  // Delivery fields
  @Column({ nullable: true })
  deliveryman_id: number;

  @ManyToOne(() => DeliveryMan)
  @JoinColumn({ name: 'deliveryman_id' })
  deliveryman: DeliveryMan;

  @Column({ nullable: true })
  delivery_date: number;

  @Column({ nullable: true })
  region_id: number;

  @Column({ nullable: true })
  district_id: number;

  @Column({ nullable: true })
  address: string;

  @Column('text', { array: true, default: [] })
  location: string[] | number[];

  @Column({ nullable: true })
  comment: string;

  // join fields
  @OneToMany(() => DealActivity, (activity) => activity.deal)
  activities: DealActivity[];

  @ManyToOne(() => DealStage, (DealStage) => DealStage.deals)
  @JoinColumn({ name: 'stage_id' })
  stage: DealStage;

  @OneToMany(() => DealOrders, (dealOrders) => dealOrders.deal)
  orders: DealOrders[];

  @ManyToOne(() => Contacts, (contact) => contact.deals, { nullable: false })
  @JoinColumn({ name: 'contact_id' })
  contact: Contacts;
}
