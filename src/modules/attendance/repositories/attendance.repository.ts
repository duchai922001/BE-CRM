import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from '../entities/attendance.entity';
import { EntityManager, Repository } from 'typeorm';

export class AttendanceRepository {
  constructor(
    @InjectRepository(Attendance) private readonly repo: Repository<Attendance>,
  ) {}

  async findByUserAndDate(
    userId: number,
    date: Date,
  ): Promise<Attendance | null> {
    return this.repo.findOne({
      where: {
        user: { id: userId },
        createdAt: date,
      },
    });
  }

  async create(dto: any, manager: EntityManager): Promise<Attendance> {
    const attendance = manager.create(Attendance, dto);
    return manager.save(attendance);
  }

  async update(dto: any, manager: EntityManager): Promise<Attendance> {
    if (!dto.id) {
      throw new Error('Missing attendance ID');
    }
    const existing = await manager.findOne(Attendance, {
      where: { id: dto.id },
    });

    if (!existing) {
      throw new Error('Attendance not found');
    }
    const updated = manager.merge(Attendance, existing, dto);
    return manager.save(updated);
  }
}
