import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthUseCase } from './use-cases/auth-user.usecase';
import { TransactionManager } from 'src/database/transaction.manager';
import { UserRepository } from './repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { UserUseCase } from './use-cases/user.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'JWT_SECRET',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthUseCase, UserUseCase, TransactionManager, UserRepository],
  controllers: [AuthController, UserController],
  exports: [UserRepository],
})
export class UserModule {}
