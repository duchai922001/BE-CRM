import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { TasksUseCase } from '../use-cases/tasks.use-case';
import { createResponse } from 'src/common/helpers/response.helper';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { AssignTaskUseCase } from '../use-cases/assign-task.usecase';
import { NotificationsGateway } from 'src/gateway/notifications.gateway';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksUseCase: TasksUseCase,
    private readonly assignTaskUseCase: AssignTaskUseCase,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}
  @Post('create')
  async create(@Body() dto: CreateTaskDto) {
    const data = await this.tasksUseCase.create(dto);
    return createResponse(HttpStatus.OK, data, 'Tạo thành công');
  }

  @Get('get-all')
  @HttpCode(200)
  async getAll() {
    const data = await this.tasksUseCase.findAll();
    return createResponse(HttpStatus.OK, data, 'Lấy dữ liệu thành công');
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: number, @Body() dto: UpdateTaskDto) {
    const data = await this.tasksUseCase.update(id, dto);
    return createResponse(HttpStatus.OK, data, 'Cập nhật dữ liệu thành công');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: number) {
    const data = await this.tasksUseCase.delete(id);
    return createResponse(HttpStatus.OK, data, 'Xóa dữ liệu thành công');
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: number) {
    const data = await this.tasksUseCase.findTaskById(id);
    return createResponse(HttpStatus.OK, data, 'Lấy dữ liệu thành công');
  }

  @Get('/get-task-user/:id')
  @HttpCode(HttpStatus.OK)
  async findTasksByUser(@Param('id') id: number) {
    const data = await this.tasksUseCase.findTasksByUser(id);
    return createResponse(HttpStatus.OK, data, 'Lấy dữ liệu thành công');
  }

  @Post('assign/:taskId')
  @HttpCode(HttpStatus.OK)
  async assignTask(
    @Param('taskId') taskId: number,
    @Body() { assigneeId }: { assigneeId: number },
  ) {
    const task = await this.assignTaskUseCase.execute(taskId, assigneeId);

    // Gửi thông báo cho user (Staff)
    this.notificationsGateway.sendNotification(assigneeId, {
      id: task.id,
      name: task.name,
      description: task.description,
    });

    return { message: 'Công việc đã được giao thành công', task };
  }
}
