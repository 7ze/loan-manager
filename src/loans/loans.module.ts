import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { LoanRepository } from './loan.repository';
import { LoansController } from './loans.controller';
import { LoansService } from './loans.service';

@Module({
  imports: [TypeOrmModule.forFeature([LoanRepository]), AuthModule],
  controllers: [LoansController],
  providers: [LoansService],
})
export class LoansModule {}
