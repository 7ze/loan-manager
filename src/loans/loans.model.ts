export interface Loan {
  id: string;
  createdAt: number;
  loanAmount: number;
  loanDuration: number;
  loanStatus: LoanStatus;
}

export enum LoanStatus {
  NEW = 'NEW',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED',
}
