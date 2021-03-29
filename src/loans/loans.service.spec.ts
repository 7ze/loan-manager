import { Test } from '@nestjs/testing';
import { User } from 'src/auth/user.entity';
import { UserRepository } from 'src/auth/user.repository';
import { LoanStatus } from './loan-status.enum';
import { LoanRepository } from './loan.repository';
import { LoansService } from './loans.service';

const mockLoanRepository = () => ({
  getLoanRequests: jest.fn(),
});

const mockUserRepository = () => ({
  //
});

const mockUser = new User();

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

  describe('getLoanRequests', () => {
    it('should be a pure function that returns the result of loanRepository.getLoanRequests()', async () => {
      loanRepository.getLoanRequests.mockResolvedValue('loan_requests');
      const mockLoanRequestFilterDto = {
        status: LoanStatus.NEW,
      };

      expect(loanRepository.getLoanRequests).not.toHaveBeenCalled();
      const result = await loansService.getLoanRequests(
        mockLoanRequestFilterDto,
        mockUser,
      );
      expect(loanRepository.getLoanRequests).toHaveBeenCalledWith(
        mockLoanRequestFilterDto,
        mockUser,
      );
      expect(result).toEqual('loan_requests');
      expect(result).not.toEqual('some_modified_result');
    });
  });
});
