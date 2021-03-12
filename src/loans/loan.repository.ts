import { EntityRepository, Repository } from 'typeorm';
import { LoanRequestFilterDto } from './dto/loan-request-filter.dto';
import { LoanRequestDto } from './dto/loan-request.dto';
import { Loan } from './loan.entity';

@EntityRepository(Loan)
export class LoanRepository extends Repository<Loan> {
  async getLoanRequests(
    loanRequestFilterDto: LoanRequestFilterDto,
  ): Promise<Loan[]> {
    const { status } = loanRequestFilterDto;
    const query = this.createQueryBuilder('loan');
    if (status) {
      query.andWhere('loan.loan_status = :status', { status });
    }
    return await query.getMany();
  }

  async createLoanRequest(loanRequestDto: LoanRequestDto): Promise<Loan> {
    const { total_amount, duration_months } = loanRequestDto;
    const loanRequest = new Loan();
    loanRequest.total_amount = total_amount;
    loanRequest.duration_months = duration_months;
    await loanRequest.save();
    return loanRequest;
  }
}
