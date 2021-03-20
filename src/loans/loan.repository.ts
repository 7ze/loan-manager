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
    const loanRequest = new Loan();

    for (const key in loanRequestDto) {
      if (loanRequestDto.hasOwnProperty(key)) {
        loanRequest[key] = loanRequestDto[key];
      }
    }

    await loanRequest.save();
    return loanRequest;
  }
}
