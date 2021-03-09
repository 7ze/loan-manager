import { Injectable } from '@nestjs/common';
import { Loan, LoanStatus } from './loans.model';
import { v4 as uuid } from 'uuid';
import { LoanRequestDto } from 'src/dto/loanRequest.dto';

@Injectable()
export class LoansService {
  private loans: Loan[] = [];

  getAllLoanRequests(): Loan[] {
    return this.loans;
  }

  createLoanRequest(loanRequestDto: LoanRequestDto): Loan {
    const { loanAmount, loanDuration } = loanRequestDto;
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
