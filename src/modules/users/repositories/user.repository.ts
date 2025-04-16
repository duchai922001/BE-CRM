import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto, manager: EntityManager) {
    const user = manager.create(User, dto);
    return manager.save(user);
  }

  async checkEmail(email: string): Promise<User | null> {
    return this.repo.findOne({
      where: { email },
    });
  }

  async findAll() {
    return this.repo.find();
  }
}
