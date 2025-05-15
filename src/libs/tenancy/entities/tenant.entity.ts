import { Column, DeepPartial, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tenant')
export class Tenant {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'name', nullable: true })
  name?: string;

  @Column({ unique: true, name: 'database_name' })
  database_name: string;

  @Column({ unique: true, name: 'hostnames' })
  hostnames: string;

  constructor(partial: DeepPartial<Tenant>) {
    Object.assign(this, partial);
  }
}
