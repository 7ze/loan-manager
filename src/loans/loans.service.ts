import { Injectable } from '@nestjs/common';
import { Loan } from './loans.model';

@Injectable()
export class LoansService {
  private loans: Loan[] = [];

  getAllLoans(): Loan[] {
    return this.loans;
  }
}
