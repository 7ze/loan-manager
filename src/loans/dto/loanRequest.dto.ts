import { IsNotEmpty } from 'class-validator';

export class LoanRequestDto {
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  duration: number;
}
