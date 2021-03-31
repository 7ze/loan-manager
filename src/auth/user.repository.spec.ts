import { AuthCredentialsDto } from './dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { Test } from '@nestjs/testing';
import { DatabaseErrors } from 'src/utils';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './user.entity';

const mockAuthCredentialsDto: AuthCredentialsDto = {
  username: 'mock_user',
  password: 'password',
};

jest.mock('bcrypt');
const mocked_bcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('signUp', () => {
    let save: jest.Mock<any, any>;

    beforeEach(() => {
      save = jest.fn();
      userRepository.create = jest.fn().mockReturnValue({ save });
    });

    it('successfully signs up the user', () => {
      save.mockResolvedValue(true);
      expect(
        userRepository.signUp(mockAuthCredentialsDto),
      ).resolves.not.toThrow();
    });

    it('throws a conflict exception if username already exists', async () => {
      save.mockRejectedValue({ code: DatabaseErrors.CONFLICT });
      expect(userRepository.signUp(mockAuthCredentialsDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('throws an internal server error exception on catching any other error', async () => {
      save.mockRejectedValue({ code: 'someother_error_code' });
      await expect(
        userRepository.signUp(mockAuthCredentialsDto),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('validateUserPassword', () => {
    let user: User;

    beforeEach(() => {
      userRepository.findOne = jest.fn();
      user = new User();
      user.username = 'mock_user';
      user.password = 'password';
    });

    it('returns the username if validation is successful', async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(user);
      mocked_bcrypt.compare.mockResolvedValue(true);
      const result = await userRepository.validateUserPassword(
        mockAuthCredentialsDto,
      );
      expect(userRepository.findOne).toHaveBeenCalled();
      expect(bcrypt.compare).toHaveBeenCalled();
      expect(result).toEqual('mock_user');
    });

    it('returns null if user not found', async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(undefined);
      mocked_bcrypt.compare.mockResolvedValue(false);
      const result = await userRepository.validateUserPassword(
        mockAuthCredentialsDto,
      );
      expect(userRepository.findOne).toHaveBeenCalled();
      expect(bcrypt.compare).toHaveBeenCalled();
      expect(result).toEqual(null);
    });

    it('returns null if password is invalid', async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(user);
      mocked_bcrypt.compare.mockResolvedValue(false);
      const result = await userRepository.validateUserPassword(
        mockAuthCredentialsDto,
      );
      expect(userRepository.findOne).toHaveBeenCalled();
      expect(bcrypt.compare).toHaveBeenCalled();
      expect(result).toEqual(null);
    });
  });
});
