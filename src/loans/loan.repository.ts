import { EntityRepository, Repository } from 'typeorm';
import { Loan } from './loan.entity';

@EntityRepository(Loan)
export class LoanRepository extends Repository<Loan> {}
