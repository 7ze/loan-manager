import { EntityRepository, Repository } from 'typeorm';
import { Loan } from './loan.entity';

@EntityRepository(Loan)
export class TaskRepository extends Repository<Loan> {}
