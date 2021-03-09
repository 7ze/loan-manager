import { Injectable } from '@nestjs/common';
import { Loan, LoanStatus } from './loans.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LoansService {
  private loans: Loan[] = [];

  getAllLoanRequests(): Loan[] {
    return this.loans;
  }

  createLoanRequest(loanAmount: number, loanDuration: number): Loan {
    const loanRequest = {
      id: uuid(),
      createdAt: Date.now(),
      loanAmount,
      loanDuration,
      loanStatus: LoanStatus.NEW,
    };
    this.loans.push(loanRequest);
    return loanRequest;
  }
}
