import { DealStage } from '../../deal-stage/entities/dealStage.entity';
import { Branch } from '../../branch/entities/branch.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'pipeline',
})
export class Pipeline {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'branch_id', type: 'int', nullable: false })
  branch_id: number;

  @ManyToOne(() => Branch, (branch) => branch.pipeline, {
    nullable: false,
  })
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  @OneToMany(() => DealStage, (dealStage) => dealStage.pipeline)
  dealStages: DealStage[];
}
