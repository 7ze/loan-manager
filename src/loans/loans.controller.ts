import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoanRequestDto } from 'src/dto/loanRequest.dto';
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
  createLoanRequest(@Body() loanRequestDto: LoanRequestDto): Loan {
    return this.loansService.createLoanRequest(loanRequestDto);
  }
}
