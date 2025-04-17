import { Injectable } from '@nestjs/common';
import { TasksRepository } from '../repositories/tasks.repository';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { Tasks } from '../entities/tasks.entity';
import { UpdateTaskDto } from '../dtos/update-task.dto';

@Injectable()
export class TasksUseCase {
  constructor(private tasksRepo: TasksRepository) {}
  async create(dto: CreateTaskDto): Promise<Tasks> {
    return this.tasksRepo.createTask(dto);
  }

  async findAll(): Promise<Tasks[]> {
    return this.tasksRepo.findAllTasks();
  }

  async update(id: number, dto: UpdateTaskDto): Promise<Tasks> {
    return this.tasksRepo.updateTask(id, dto);
  }
  async delete(id: number): Promise<void> {
    return this.tasksRepo.deleteTask(id);
  }

  async findTaskById(id: number): Promise<Tasks | null> {
    return this.tasksRepo.findTaskById(id);
  }

  async findTasksByUser(userId: number): Promise<Tasks[]> {
    return this.tasksRepo.findTasksByUser(userId);
  }
}
