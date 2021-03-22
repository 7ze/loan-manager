import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/auth/user-role.enum';
import { User } from 'src/auth/user.entity';
import { UserRepository } from 'src/auth/user.repository';
import { LoanRequestFilterDto } from './dto/loan-request-filter.dto';
import { LoanRequestDto } from './dto/loan-request.dto';
import { LoanStatus } from './loan-status.enum';
import { Loan } from './loan.entity';
import { LoanRepository } from './loan.repository';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(LoanRepository) private loanRepository: LoanRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
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

  async createLoanRequest(
    loanRequestDto: LoanRequestDto,
    user: User,
  ): Promise<Loan> {
    const { customer_id } = loanRequestDto;
    const found = await this.userRepository.findOne(customer_id);

    if (!found || found.role !== UserRole.CUSTOMER) {
      throw new NotFoundException(`Customer with id ${customer_id} not found!`);
    }

    return this.loanRepository.createLoanRequest(loanRequestDto, user);
  }

  async updateLoanRequestStatus(
    id: number,
    status: LoanStatus,
    user: User,
  ): Promise<Loan> {
    const found = await this.getLoanRequestById(id, user);
    found.loan_status = status;
    await found.save();
    return found;
  }

  async deleteLoanRequest(id: number): Promise<void> {
    const { affected } = await this.loanRepository.delete(id);
    if (!affected) {
      throw new NotFoundException(`Loan request with id '${id}' not found!`);
    }
  }
}
