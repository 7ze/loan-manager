import { Controller, Get } from '@nestjs/common';
import { LoansService } from './loans.service';

@Controller('loans')
export class LoansController {
  constructor(private loansService: LoansService) {}

  @Get()
  getAllLoans() {
    return this.loansService.getAllLoans();
  }
}
