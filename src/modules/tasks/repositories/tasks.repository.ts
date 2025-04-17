import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tasks } from '../entities/tasks.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Tasks) private readonly repo: Repository<Tasks>,
  ) {}
  async save(task: Tasks): Promise<Tasks> {
    return this.repo.save(task);
  }
  async createTask(dto: CreateTaskDto): Promise<Tasks> {
    const task = this.repo.create(dto);
    return this.repo.save(task);
  }
  async findAllTasks(): Promise<Tasks[]> {
    return this.repo.find();
  }
  async findTaskById(id: number): Promise<Tasks | null> {
    return await this.repo.findOneBy({ id });
  }

  async findTasksByUser(userId: number): Promise<Tasks[]> {
    return this.repo.find({
      where: {
        assignee: { id: userId },
      },
      relations: ['assignee'], 
    });
  }

  async updateTask(id: number, dto: UpdateTaskDto): Promise<Tasks> {
    const task = await this.repo.findOneBy({ id });

    if (!task) throw new NotFoundException('Không tìm thấy công việc');

    if (dto.assigneeId) {
      const userRepo = this.repo.manager.getRepository(User);
      const user = await userRepo.findOneBy({ id: dto.assigneeId });
      if (!user) throw new NotFoundException('Không tìm thấy người được giao');
      task.assignee = user;
    }
    const { assigneeId, ...rest } = dto;
    Object.assign(task, rest);

    return this.repo.save(task);
  }

  async deleteTask(id: number): Promise<void> {
    const task = await this.repo.findOneBy({ id });
    if (!task) {
      throw new NotFoundException('Không tìm thấy công việc');
    }
    await this.repo.remove(task);
  }
}
