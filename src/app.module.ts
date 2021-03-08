import { Module } from '@nestjs/common';
import { LoansModule } from './loans/loans.module';

@Module({
  imports: [LoansModule],
})
export class AppModule {}
