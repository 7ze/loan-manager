import { Test } from '@nestjs/testing';
import { UserRepository } from 'src/auth/user.repository';
import { LoanRepository } from './loan.repository';
import { LoansService } from './loans.service';

const mockLoanRepository = () => ({
  //
});

const mockUserRepository = () => ({
  //
});

describe('LoansService', () => {
  let loansService;
  let loanRepository;
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LoansService,
        {
          provide: LoanRepository,
          useFactory: mockLoanRepository,
        },
        {
          provide: UserRepository,
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    loansService = module.get<LoansService>(LoansService);
    loanRepository = module.get<LoanRepository>(LoanRepository);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('some test', () => {
    // some test
  });
});
