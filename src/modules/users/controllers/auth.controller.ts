import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthUseCase } from '../use-cases/auth-user.usecase';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginDto } from '../dtos/login.dto';
import { createResponse } from 'src/common/helpers/response.helper';
import { CreateLeaderDto } from '../dtos/create-leader.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}
  @Post('/register-leader')
  async createLeader(@Body() dto: CreateLeaderDto) {
    const data = await this.authUseCase.registerLeader(dto);
    return createResponse(HttpStatus.OK, data, 'Đăng ký thành công');
  }
  @Post('register')
  async create(@Body() dto: CreateUserDto) {
    const data = await this.authUseCase.execute(dto);
    return createResponse(HttpStatus.OK, data, 'Đăng ký thành công');
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const data = await this.authUseCase.login(dto);
    return createResponse(HttpStatus.OK, data, 'Đăng nhập thành công');
  }
}
