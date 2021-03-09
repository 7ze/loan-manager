export interface Loan {
  id: string;
  createdAt: Date;
  loanStatus: LoanStatus;
}

export enum LoanStatus {
  NEW = 'NEW',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED',
}
