import { IsIn, IsOptional } from 'class-validator';
import { LoanStatus } from '../loans.model';

export class LoanRequestFilterDto {
  @IsOptional()
  @IsIn([LoanStatus.NEW, LoanStatus.REJECTED, LoanStatus.APPROVED])
  status: LoanStatus;
}
