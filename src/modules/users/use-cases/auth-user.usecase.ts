import { TransactionManager } from 'src/database/transaction.manager';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthUseCase {
  constructor(
    private readonly transactionManager: TransactionManager,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: CreateUserDto) {
    return this.transactionManager.runInTransaction(async (manager) => {
      const checkExitsUser = await this.userRepository.checkEmail(dto.email);
      if (checkExitsUser) {
        throw new BadRequestException('User exits');
      }
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const convertData = { ...dto, password: hashedPassword };
      return this.userRepository.create(convertData, manager);
    });
  }

  async login(dto: LoginDto) {
    const checkExitsUser = await this.userRepository.checkEmail(dto.email);
    if (!checkExitsUser) {
      throw new BadRequestException('Email or password invalid');
    }
    const comparePassword = await bcrypt.compare(
      dto.password,
      checkExitsUser.password,
    );
    if (!comparePassword) {
      throw new BadRequestException('Email or password invalid');
    }
    const payload = { sub: checkExitsUser.id, email: checkExitsUser.email };
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
      user: {
        id: checkExitsUser.id,
        name: checkExitsUser.name,
        email: checkExitsUser.email,
      },
    };
  }
}
