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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/auth/user-role.enum';
import { User } from 'src/auth/user.entity';
import { LoanRequestFilterDto } from './dto/loan-request-filter.dto';
import { LoanRequestDto } from './dto/loan-request.dto';
import { LoanStatus } from './loan-status.enum';
import { Loan } from './loan.entity';
import { LoansService } from './loans.service';
import { LoanStatusValidationPipe } from './pipes/loan-status-validation.pipe';

@Controller('loans')
@UseGuards(AuthGuard())
export class LoansController {
  constructor(private loansService: LoansService) {}

  @Get()
  getLoanRequests(
    @Query(ValidationPipe) loanRequestFilterDto: LoanRequestFilterDto,
    @GetUser() user: User,
  ): Promise<Loan[]> {
    return this.loansService.getLoanRequests(loanRequestFilterDto, user);
  }

  @Get(':id')
  getLoanRequestById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Loan> {
    return this.loansService.getLoanRequestById(id, user);
  }

  @Post()
  @Roles(UserRole.AGENT)
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  createLoanRequest(
    @Body() loanRequestDto: LoanRequestDto,
    @GetUser() user: User,
  ): Promise<Loan> {
    return this.loansService.createLoanRequest(loanRequestDto, user);
  }

  @Patch(':id/status')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  updateLoanRequestStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', LoanStatusValidationPipe) status: LoanStatus,
    @GetUser() user: User,
  ): Promise<Loan> {
    return this.loansService.updateLoanRequestStatus(id, status, user);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteLoanRequest(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.loansService.deleteLoanRequest(id);
  }
}
