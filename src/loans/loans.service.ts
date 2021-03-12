import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoanRequestDto } from './dto/loan-request.dto';
import { LoanStatus } from './loan-status.enum';
import { Loan } from './loan.entity';
import { LoanRepository } from './loan.repository';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(LoanRepository) private loanRepository: LoanRepository,
  ) {}

  // getAllLoanRequests(): LoanRequest[] {
  //   return this.loans;
  // }
  // getLoanRequestWithFilter(
  //   loanRequestFilterDto: LoanRequestFilterDto,
  // ): LoanRequest[] {
  //   const { status } = loanRequestFilterDto;
  //   return this.loans.filter((loan) => loan.status === status);
  // }

  async getLoanRequestById(id: number): Promise<Loan> {
    const found = await this.loanRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Loan request with id '${id}' not found!`);
    }
    return found;
  }

  createLoanRequest(loanRequestDto: LoanRequestDto): Promise<Loan> {
    return this.loanRepository.createLoanRequest(loanRequestDto);
  }

  async updateLoanRequestStatus(id: number, status: LoanStatus): Promise<Loan> {
    const found = await this.getLoanRequestById(id);
    found.loan_status = status;
    await found.save();
    return found;
  }

  // deleteLoanRequest(id: string): void {
  //   const found = this.getLoanRequestById(id);
  //   this.loans = this.loans.filter((loan) => loan.id !== found.id);
  // }
}
