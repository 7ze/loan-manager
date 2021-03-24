import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseErrors } from 'src/utils/database-errors.enum';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.password = await this.hashPassword(password);

    try {
      await user.save();
    } catch (err) {
      throw err.code === DatabaseErrors.CONFLICT
        ? new ConflictException('Username exists!')
        : new InternalServerErrorException();
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user.username;
    } else {
      return null;
    }
  }
}
