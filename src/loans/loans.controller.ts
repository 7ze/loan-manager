import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoanRequestDto } from './dto/loan-request.dto';
import { LoanStatus } from './loan-status.enum';
import { Loan } from './loan.entity';
import { LoansService } from './loans.service';
import { LoanStatusValidationPipe } from './pipes/loan-status-validation.pipe';

@Controller('loans')
export class LoansController {
  constructor(private loansService: LoansService) {}

  // @Get()
  // getLoanRequests(
  //   @Query(ValidationPipe) loanRequestFilterDto: LoanRequestFilterDto,
  // ): LoanRequest[] {
  //   if (Object.keys(loanRequestFilterDto).length) {
  //     return this.loansService.getLoanRequestWithFilter(loanRequestFilterDto);
  //   }
  //   return this.loansService.getAllLoanRequests();
  // }

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

  // @Delete(':id')
  // @HttpCode(204)
  // deleteLoanRequest(@Param('id') id: string): void {
  //   return this.loansService.deleteLoanRequest(id);
  // }
}
