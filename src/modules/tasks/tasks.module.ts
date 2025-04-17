import { Module } from '@nestjs/common';
import { Tasks } from './entities/tasks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksUseCase } from './use-cases/tasks.use-case';
import { TasksRepository } from './repositories/tasks.repository';
import { TasksController } from './controllers/tasks.controller';
import { NotificationsGateway } from 'src/gateway/notifications.gateway';
import { AssignTaskUseCase } from './use-cases/assign-task.usecase';
import { UserModule } from '../users/user.module';
@Module({
  imports: [TypeOrmModule.forFeature([Tasks]), UserModule],
  providers: [
    TasksUseCase,
    TasksRepository,
    NotificationsGateway,
    AssignTaskUseCase,
  ],
  controllers: [TasksController],
})
export class TasksModule {}
