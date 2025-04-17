import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationsGateway } from 'src/gateway/notifications.gateway';
import { TasksRepository } from '../repositories/tasks.repository';
import { UserRepository } from 'src/modules/users/repositories/user.repository';

@Injectable()
export class AssignTaskUseCase {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly userRepository: UserRepository,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  async execute(taskId: number, assigneeId: number) {
    const task = await this.tasksRepository.findTaskById(taskId);
    if (!task) throw new NotFoundException('Không tìm thấy công việc');

    const assignee = await this.userRepository.findUserByAssign(assigneeId);
    if (!assignee)
      throw new NotFoundException('Không tìm thấy người được giao');

    task.assignee = assignee;
    await this.tasksRepository.save(task);

    // Gửi thông báo
    this.notificationsGateway.sendNotification(assignee.id, {
      message: `Bạn vừa được giao công việc: ${task.name}`,
      taskId: task.id,
    });

    return task;
  }
}
