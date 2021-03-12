import { IsIn, IsOptional } from 'class-validator';
import { LoanStatus } from '../loan-status.enum';

export class LoanRequestFilterDto {
  @IsOptional()
  @IsIn([LoanStatus.NEW, LoanStatus.REJECTED, LoanStatus.APPROVED])
  status: LoanStatus;
}
