import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseErrors } from 'src/utils/database-errors.enum';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const user = new User();
    user.username = username;
    user.password = password;
    try {
      await user.save();
    } catch (err) {
      throw err.code === DatabaseErrors.CONFLICT
        ? new ConflictException('Username exists!')
        : new InternalServerErrorException();
    }
  }
}
