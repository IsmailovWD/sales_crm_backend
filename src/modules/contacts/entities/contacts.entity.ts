import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Regions } from '../../regions/entities/regions.entity'; // Agar `regionId` bor bo'lsa
import { Districts } from '../../districts/entities/districts.entity'; // Agar `districtId` bor bo'lsa
import { Deal } from '../../deal/entities/deal.entity';

@Entity('contacts')
export class Contacts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'Name' })
  name: string;

  @Column({ nullable: true, default: null })
  phone_number: string;

  @Column({ default: false })
  is_client: boolean;

  @Column({ default: false })
  is_supplier: boolean;

  @Column({ nullable: true, default: null })
  dial_code: string;

  @Column({ nullable: true, default: null })
  country_code: string;

  @Column({ nullable: true })
  region_id: number;

  @Column({ nullable: true })
  district_id: number;

  @ManyToOne(() => Regions, (region) => region.contacts, { nullable: true })
  @JoinColumn({ name: 'region_id' })
  region: Regions;

  @ManyToOne(() => Districts, (district) => district.contacts, {
    nullable: true,
  })
  @JoinColumn({ name: 'district_id' })
  district: Districts;

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

  @OneToMany(() => Deal, (deal) => deal.contact)
  deals: Deal[];
}
