import { IsNotEmpty } from 'class-validator';

export class LoanRequestDto {
  @IsNotEmpty()
  total_amount: number;

  @IsNotEmpty()
  duration_months: number;
}
