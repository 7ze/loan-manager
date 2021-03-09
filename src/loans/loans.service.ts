import { Injectable } from '@nestjs/common';
import { LoanRequest, LoanStatus } from './loans.model';
import { v4 as uuid } from 'uuid';
import { LoanRequestDto } from 'src/dto/loanRequest.dto';

@Injectable()
export class LoansService {
  private loans: LoanRequest[] = [];

  getAllLoanRequests(): LoanRequest[] {
    return this.loans;
  }

  getLoanRequestById(id: string): LoanRequest {
    return this.loans.find((loan) => loan.id === id);
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
    this.loans = this.loans.filter((loan) => loan.id !== id);
  }
}
