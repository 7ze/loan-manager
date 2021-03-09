import { Injectable, NotFoundException } from '@nestjs/common';
import { LoanRequest, LoanStatus } from './loans.model';
import { v4 as uuid } from 'uuid';
import { LoanRequestDto } from './dto/loan-request.dto';
import { LoanRequestFilterDto } from './dto/loan-request-filter.dto';

@Injectable()
export class LoansService {
  private loans: LoanRequest[] = [];

  getAllLoanRequests(): LoanRequest[] {
    return this.loans;
  }

  getLoanRequestWithFilter(
    loanRequestFilterDto: LoanRequestFilterDto,
  ): LoanRequest[] {
    const { status } = loanRequestFilterDto;
    return this.loans.filter((loan) => loan.status === status);
  }

  getLoanRequestById(id: string): LoanRequest {
    const found = this.loans.find((loan) => loan.id === id);
    if (!found) {
      throw new NotFoundException(`Loan request with id '${id}' not found!`);
    }
    return found;
  }

  createLoanRequest(loanRequestDto: LoanRequestDto): LoanRequest {
    const { amount, duration } = loanRequestDto;
    const loanRequest = {
      id: uuid(),
      createdAt: Date.now(),
      amount,
      duration,
      status: LoanStatus.NEW,
    };
    this.loans.push(loanRequest);
    return loanRequest;
  }

  updateLoanRequestStatus(id: string, status: LoanStatus): LoanRequest {
    const found = this.getLoanRequestById(id);
    found.status = status;
    return found;
  }

  deleteLoanRequest(id: string): void {
    const found = this.getLoanRequestById(id);
    this.loans = this.loans.filter((loan) => loan.id !== found.id);
  }
}
