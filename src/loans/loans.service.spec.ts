import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UserRole } from 'src/auth/user-role.enum';
import { User } from 'src/auth/user.entity';
import { UserRepository } from 'src/auth/user.repository';
import { LoanStatus } from './loan-status.enum';
import { LoanRepository } from './loan.repository';
import { LoansService } from './loans.service';

const mockLoanRepository = () => ({
  getLoanRequests: jest.fn(),
  findOne: jest.fn(),
  createLoanRequest: jest.fn(),
});

const mockUserRepository = () => ({
  findOne: jest.fn(),
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
    it('should return the result of loanRepository.getLoanRequests() unchanged', async () => {
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

  describe('getLoanRequestById', () => {
    it("should pass a custom findOne() argument that only filters through the customer's loan requests", async () => {
      mockUser.role = UserRole.CUSTOMER;
      loanRepository.findOne.mockResolvedValue('mock_user');

      expect(loanRepository.findOne).not.toHaveBeenCalled();
      await loansService.getLoanRequestById(1, mockUser);
      expect(loanRepository.findOne).toHaveBeenCalledWith({
        where: { loan_id: 1, customer_id: mockUser.id },
      });
    });

    it('should do the regular findOne() if user is not a customer', async () => {
      mockUser.role = UserRole.ADMIN;
      loanRepository.findOne.mockResolvedValue('mock_user');

      expect(loanRepository.findOne).not.toHaveBeenCalled();
      await loansService.getLoanRequestById(1, mockUser);
      expect(loanRepository.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw an NotFoundException if loan request is not found', async () => {
      mockUser.role = UserRole.CUSTOMER;
      loanRepository.findOne.mockResolvedValue(undefined);

      expect(loanRepository.findOne).not.toHaveBeenCalled();
      await expect(
        loansService.getLoanRequestById(1, mockUser),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return the result of loanRepository.findOne() unchanged if loan request is found', async () => {
      mockUser.role = UserRole.ADMIN;
      loanRepository.findOne.mockResolvedValue('mock_user');

      const result = await loansService.getLoanRequestById(1, mockUser);
      expect(result).toEqual('mock_user');
      expect(result).not.toEqual('something_else');
    });
  });

  describe('createLoanRequest', () => {
    it('should throw a NotFoundException if loan applicant is not a customer', async () => {
      const mockLoanRequestDto = {
        customer_id: 1,
      };
      mockUser.role = UserRole.AGENT;
      userRepository.findOne.mockResolvedValue(mockUser);
      await expect(
        loansService.createLoanRequest(mockLoanRequestDto, mockUser),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw a NotFoundException if customer is not found', async () => {
      const mockLoanRequestDto = {
        customer_id: 1,
      };
      userRepository.findOne.mockResolvedValue(undefined);

      await expect(
        loansService.createLoanRequest(mockLoanRequestDto, mockUser),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return the result of loanRepository.createLoanRequest() unchanged if loan applicant is a customer', async () => {
      const mockLoanRequestDto = {
        customer_id: 1,
      };
      mockUser.role = UserRole.CUSTOMER;
      userRepository.findOne.mockResolvedValue(mockUser);
      loanRepository.createLoanRequest.mockResolvedValue('new_loan_request');

      expect(loanRepository.createLoanRequest).not.toHaveBeenCalled();
      const result = await loansService.createLoanRequest(
        mockLoanRequestDto,
        mockUser,
      );
      expect(loanRepository.createLoanRequest).toHaveBeenCalledWith(
        mockLoanRequestDto,
        mockUser,
      );
      expect(result).toEqual('new_loan_request');
    });
  });
});
