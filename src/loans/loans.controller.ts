import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoanRequestFilterDto } from './dto/loan-request-filter.dto';
import { LoanRequestDto } from './dto/loan-request.dto';
import { LoanStatus } from './loan-status.enum';
import { Loan } from './loan.entity';
import { LoansService } from './loans.service';
import { LoanStatusValidationPipe } from './pipes/loan-status-validation.pipe';

@Controller('loans')
export class LoansController {
  constructor(private loansService: LoansService) {}

  @Get()
  getLoanRequests(
    @Query(ValidationPipe) loanRequestFilterDto: LoanRequestFilterDto,
  ): Promise<Loan[]> {
    return this.loansService.getLoanRequests(loanRequestFilterDto);
  }

  @Get(':id')
  getLoanRequestById(@Param('id', ParseIntPipe) id: number): Promise<Loan> {
    return this.loansService.getLoanRequestById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createLoanRequest(@Body() loanRequestDto: LoanRequestDto): Promise<Loan> {
    return this.loansService.createLoanRequest(loanRequestDto);
  }

  @Patch(':id/status')
  updateLoanRequestStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', LoanStatusValidationPipe) status: LoanStatus,
  ): Promise<Loan> {
    return this.loansService.updateLoanRequestStatus(id, status);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteLoanRequest(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.loansService.deleteLoanRequest(id);
  }
}
