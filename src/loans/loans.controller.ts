import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LoanRequestDto } from 'src/dto/loanRequest.dto';
import { LoanRequest, LoanStatus } from './loans.model';
import { LoansService } from './loans.service';

@Controller('loans')
export class LoansController {
  constructor(private loansService: LoansService) {}

  @Get()
  getAllLoans(): LoanRequest[] {
    return this.loansService.getAllLoanRequests();
  }

  @Get(':id')
  getLoanRequestById(@Param('id') id: string): LoanRequest {
    return this.loansService.getLoanRequestById(id);
  }

  @Post()
  createLoanRequest(@Body() loanRequestDto: LoanRequestDto): LoanRequest {
    return this.loansService.createLoanRequest(loanRequestDto);
  }

  @Patch(':id/status')
  updateLoanRequestStatus(
    @Param('id') id: string,
    @Body('status') status: LoanStatus,
  ): LoanRequest {
    return this.loansService.updateLoanRequestStatus(id, status);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteLoanRequest(@Param('id') id: string): void {
    return this.loansService.deleteLoanRequest(id);
  }
}
