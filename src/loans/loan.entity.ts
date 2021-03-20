import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LoanStatus } from './loan-status.enum';

@Entity()
export class Loan extends BaseEntity {
  @PrimaryGeneratedColumn()
  loan_id: number;

  @Column()
  customer_id: number;

  @Column('real')
  total_loan_amount: number;

  @Column('real')
  emi: number;

  @Column('real')
  rate_of_interest: number;

  @Column()
  tenure_months: number;

  @Column({ default: LoanStatus.NEW })
  loan_status: LoanStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.loans, { eager: false })
  user: User;
}
