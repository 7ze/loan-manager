import { Body, Controller, Get, Post } from '@nestjs/common';
import { Loan } from './loans.model';
import { LoansService } from './loans.service';

@Controller('loans')
export class LoansController {
  constructor(private loansService: LoansService) {}

  @Get()
  getAllLoans() {
    return this.loansService.getAllLoanRequests();
  }

  @Post()
  createLoanRequest(
    @Body('loanAmount') loanAmount: number,
    @Body('loanDuration') loanDuration: number,
  ): Loan {
    return this.loansService.createLoanRequest(loanAmount, loanDuration);
  }
}
