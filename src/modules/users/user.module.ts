import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthUseCase } from './use-cases/auth-user.usecase';
import { UserController } from './controllers/user.controller';
import { TransactionManager } from 'src/database/transaction.manager';
import { UserRepository } from './repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'JWT_SECRET',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthUseCase, TransactionManager, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
