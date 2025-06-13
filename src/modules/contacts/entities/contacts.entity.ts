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
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { Regions } from '../../regions/entities/regions.entity'; // Agar `regionId` bor bo'lsa
import { Districts } from '../../districts/entities/districts.entity'; // Agar `districtId` bor bo'lsa
import { Deal } from '../../deal/entities/deal.entity';
import { Branch } from '../../branch/entities/branch.entity';
@Entity('contacts')
export class Contacts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
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

  @Column({ nullable: false })
  branch_id: number;

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

  @OneToMany(() => Branch, (branch) => branch.contacts)
  @JoinColumn({ name: 'branch_id' })
  branches: Branch[];
}
