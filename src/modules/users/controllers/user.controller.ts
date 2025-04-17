import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UserUseCase } from '../use-cases/user.usecase';
import { createResponse } from 'src/common/helpers/response.helper';

@Controller('users')
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Get('get-all')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.userUseCase.findAll();
    return createResponse(HttpStatus.OK, data, 'Lấy dữ liệu thành công');
  }
}
