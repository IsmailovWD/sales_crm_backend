import { Contacts } from '../../contacts/entities/contacts.entity';
import { DeliveryMan } from '../../deliveryMan/entities/deliveryMan.entity';
import { Districts } from '../../districts/entities/districts.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({
  name: 'regions',
})
export class Regions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Districts, (district) => district.region)
  districts: Districts[];

  @OneToMany(() => Districts, (district) => district.region)
  children: Districts[];

  @OneToMany(() => DeliveryMan, (deliveryMan) => deliveryMan.region) // Regionga tegishli DeliveryManlar
  deliveryMan: DeliveryMan[];

  @OneToMany(() => Contacts, (contact) => contact.region)
  contacts: Contacts[];
}
