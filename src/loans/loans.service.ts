import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/auth/user-role.enum';
import { User } from 'src/auth/user.entity';
import { LoanRequestFilterDto } from './dto/loan-request-filter.dto';
import { LoanRequestDto } from './dto/loan-request.dto';
// import { LoanStatus } from './loan-status.enum';
import { Loan } from './loan.entity';
import { LoanRepository } from './loan.repository';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(LoanRepository) private loanRepository: LoanRepository,
  ) {}

  getLoanRequests(
    loanRequestFilterDto: LoanRequestFilterDto,
    user: User,
  ): Promise<Loan[]> {
    return this.loanRepository.getLoanRequests(loanRequestFilterDto, user);
  }

  async getLoanRequestById(id: number, user: User): Promise<Loan> {
    let found: Loan;
    if (user.role === UserRole.CUSTOMER) {
      found = await this.loanRepository.findOne({
        where: { loan_id: id, customer_id: user.id },
      });
    } else {
      found = await this.loanRepository.findOne(id);
    }
    if (!found) {
      throw new NotFoundException(`Loan request with id '${id}' not found!`);
    }
    return found;
  }

  createLoanRequest(loanRequestDto: LoanRequestDto, user: User): Promise<Loan> {
    return this.loanRepository.createLoanRequest(loanRequestDto, user);
  }

  // async updateLoanRequestStatus(id: number, status: LoanStatus): Promise<Loan> {
  //   const found = await this.getLoanRequestById(id);
  //   found.loan_status = status;
  //   await found.save();
  //   return found;
  // }

  async deleteLoanRequest(id: number): Promise<void> {
    const { affected } = await this.loanRepository.delete(id);
    if (!affected) {
      throw new NotFoundException(`Loan request with id '${id}' not found!`);
    }
  }
}
