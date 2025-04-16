import { Body, Controller, Post } from '@nestjs/common';
import { AuthUseCase } from '../use-cases/auth-user.usecase';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginDto } from '../dtos/login.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly authUseCase: AuthUseCase) {}
  @Post('register')
  async create(@Body() dto: CreateUserDto) {
    return this.authUseCase.execute(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authUseCase.login(dto);
  }
}
