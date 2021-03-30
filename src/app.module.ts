import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoansModule } from './loans/loans.module';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), LoansModule, AuthModule],
})
export class AppModule {}
