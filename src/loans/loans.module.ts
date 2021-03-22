import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from 'src/auth/user.repository';
import { LoanRepository } from './loan.repository';
import { LoansController } from './loans.controller';
import { LoansService } from './loans.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LoanRepository, UserRepository]),
    AuthModule,
  ],
  controllers: [LoansController],
  providers: [LoansService],
})
export class LoansModule {}
