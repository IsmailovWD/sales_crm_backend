import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Regions } from '../../regions/entities/regions.entity';
import { Districts } from '../../districts/entities/districts.entity';
import { Branch } from 'src/modules/branch/entities/branch.entity';

@Entity()
export class DeliveryMan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, default: 'Name' })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  phone_number: string | null;

  @Column({ type: 'varchar', length: 255, select: false, nullable: true })
  password: string | null;

  @Column({ type: 'varchar', length: 10, default: null })
  dial_code: string | null;

  @Column({ type: 'varchar', length: 10, nullable: true })
  country_code: string | null;

  @Column({
    type: 'int',
    nullable: true,
  })
  region_id: number | null;

  @Column({
    type: 'int',
    nullable: true,
  })
  district_id: number | null;

  @ManyToOne(() => Regions, (region) => region.deliveryMan, { nullable: true })
  @JoinColumn({ name: 'region_id' })
  region: Regions;

  @ManyToOne(() => Districts, (district) => district.deliveryMan, {
    nullable: true,
  })
  @JoinColumn({ name: 'district_id' })
  district: Districts;

  @Column({
    type: 'enum',
    enum: ['salary', 'percent', 'none', 'summa'],
  })
  salary_type: string;

  @Column({
    type: 'decimal',
    precision: 17,
    scale: 3,
    default: 0.0,
    transformer: { to: (value) => value, from: (value) => parseFloat(value) },
  })
  salary_value: number;

  @Column({ type: 'boolean', default: false })
  werehouse_available: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToMany(() => Branch, (branch) => branch.deliveryMan)
  @JoinTable({
    name: 'delivery_man_branches',
    joinColumn: { name: 'delivery_man_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'branch_id', referencedColumnName: 'id' },
  })
  branches: Branch[];
}
