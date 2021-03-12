import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoanRequestDto } from './dto/loan-request.dto';
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

  // updateLoanRequestStatus(id: string, status: LoanStatus): LoanRequest {
  //   const found = this.getLoanRequestById(id);
  //   found.status = status;
  //   return found;
  // }

  // deleteLoanRequest(id: string): void {
  //   const found = this.getLoanRequestById(id);
  //   this.loans = this.loans.filter((loan) => loan.id !== found.id);
  // }
}
