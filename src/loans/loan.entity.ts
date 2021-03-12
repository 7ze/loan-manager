import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LoanStatus } from './loan-status.enum';

@Entity()
export class Loan extends BaseEntity {
  @PrimaryGeneratedColumn()
  loan_id: number;

  @Column()
  total_amount: number;

  @Column()
  duration_months: number;

  @Column()
  loan_status: LoanStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
