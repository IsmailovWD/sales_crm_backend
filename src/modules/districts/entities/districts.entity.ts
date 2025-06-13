import { Deal } from '../../deal/entities/deal.entity';
import { Contacts } from '../../contacts/entities/contacts.entity';
import { DeliveryMan } from '../../deliveryMan/entities/deliveryMan.entity';
import { Regions } from '../../regions/entities/regions.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity({
  name: 'districts',
})
export class Districts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => Regions, (region) => region.districts)
  @JoinColumn({ name: 'region_id' })
  region: Regions;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => DeliveryMan, (deliveryMan) => deliveryMan.district)
  deliveryMan: DeliveryMan;

  // relations
  @OneToMany(() => Deal, (deal) => deal.district)
  deals: Deal[];
}
