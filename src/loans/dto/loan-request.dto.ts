import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class LoanRequestDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  customer_id: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  total_loan_amount: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  emi: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  rate_of_interest: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  tenure_months: number;
}
