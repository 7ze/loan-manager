import { UserRole } from 'src/auth/user-role.enum';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { LoanRequestDto, LoanRequestFilterDto } from './dto';
import { Loan } from './loan.entity';

@EntityRepository(Loan)
export class LoanRepository extends Repository<Loan> {
  async getLoanRequests(
    loanRequestFilterDto: LoanRequestFilterDto,
    user: User,
  ): Promise<Loan[]> {
    const { status } = loanRequestFilterDto;
    const query = this.createQueryBuilder('loan');

    if (user.role === UserRole.CUSTOMER) {
      query.where('loan.customer_id = :id', { id: user.id });
    }

    if (status) {
      query.andWhere('loan.loan_status = :status', { status });
    }

    return await query.getMany();
  }

  async createLoanRequest(
    loanRequestDto: LoanRequestDto,
    user: User,
  ): Promise<Loan> {
    const loanRequest = new Loan();

    for (const key in loanRequestDto) {
      if (loanRequestDto.hasOwnProperty(key)) {
        loanRequest[key] = loanRequestDto[key];
      }
    }

    loanRequest.agent = user;
    await loanRequest.save();

    delete loanRequest.agent;
    return loanRequest;
  }
}
