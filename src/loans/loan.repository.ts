import { EntityRepository, Repository } from 'typeorm';
import { LoanRequestDto } from './dto/loan-request.dto';
import { Loan } from './loan.entity';

@EntityRepository(Loan)
export class LoanRepository extends Repository<Loan> {
  async createLoanRequest(loanRequestDto: LoanRequestDto): Promise<Loan> {
    const { total_amount, duration_months } = loanRequestDto;
    const loanRequest = new Loan();
    loanRequest.total_amount = total_amount;
    loanRequest.duration_months = duration_months;
    await loanRequest.save();
    return loanRequest;
  }
}
