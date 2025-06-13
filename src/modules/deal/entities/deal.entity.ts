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
import { DealOrders } from '../../deal-orders/entities/dealOrders.entity';
import { DealActivity } from '../../deal-activity/entities/deal-activity.entity';
import { DeliveryMan } from '../../deliveryMan/entities/deliveryMan.entity';
import { Regions } from '../../regions/entities/regions.entity';
import { Districts } from '../../districts/entities/districts.entity';
import { Branch } from '../../branch/entities/branch.entity';

const ColumnNumericTransformer = {
  to: (value: number) => value,
  from: (value: string): number | null => (value ? parseFloat(value) : null),
};

@Entity('deal')
// @Index('IDX_DEAL_DealStage_CONTACT', ['deal_stage', 'contact'])
export class Deal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  title: string | null;

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

  @Column({ nullable: true, type: 'int' })
  assigned_user_id: number | null;

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
  @Column({ nullable: true, type: 'int' })
  deliveryman_id: number | null;

  @ManyToOne(() => DeliveryMan)
  @JoinColumn({ name: 'deliveryman_id' })
  deliveryman: DeliveryMan | null;

  @Column({
    nullable: true,
    type: 'bigint',
    transformer: ColumnNumericTransformer,
  })
  delivery_date: number | null;

  @Column({ nullable: true, type: 'int' })
  region_id: number | null;

  @Column({ nullable: true, type: 'int' })
  district_id: number | null;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  address: string | null;

  @Column('text', { array: true, default: [] })
  location: string[] | number[];

  @Column({ type: 'varchar', nullable: true })
  comment: string | null;

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

  @ManyToOne(() => Regions, (region) => region.deals, { nullable: true })
  @JoinColumn({ name: 'region_id' })
  region: Regions;

  @ManyToOne(() => Districts, (district) => district.deals, { nullable: true })
  @JoinColumn({ name: 'district_id' })
  district: Districts;
}
