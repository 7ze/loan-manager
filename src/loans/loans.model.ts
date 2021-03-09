export interface LoanRequest {
  id: string;
  createdAt: number;
  amount: number;
  duration: number;
  status: LoanStatus;
}

export enum LoanStatus {
  NEW = 'NEW',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED',
}
