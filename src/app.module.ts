import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { LoansModule } from './loans/loans.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), LoansModule],
})
export class AppModule {}
