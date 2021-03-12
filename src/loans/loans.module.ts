import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanRepository } from './loan.repository';
import { LoansController } from './loans.controller';
import { LoansService } from './loans.service';

@Module({
  imports: [TypeOrmModule.forFeature([LoanRepository])],
  controllers: [LoansController],
  providers: [LoansService],
})
export class LoansModule {}
