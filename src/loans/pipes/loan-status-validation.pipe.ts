import { BadRequestException, PipeTransform } from '@nestjs/common';
import { LoanStatus } from '../loan-status.enum';

export class LoanStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    LoanStatus.NEW,
    LoanStatus.REJECTED,
    LoanStatus.APPROVED,
  ];

  transform(value: string) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`invalid status '${value}'`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    return this.allowedStatuses.includes(status);
  }
}
