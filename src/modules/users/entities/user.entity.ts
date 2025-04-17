import { Attendance } from 'src/modules/attendance/entities/attendance.entity';
import { Tasks } from 'src/modules/tasks/entities/tasks.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

// user.entity.ts
export type UserRole = 'Leader' | 'Staff';
@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({
    type: 'enum',
    enum: ['Leader', 'Staff'],
    default: 'Staff',
  })
  role: UserRole;
  @Column({ nullable: true })
  phone: string;

  @OneToMany(() => Attendance, (attendance) => attendance.user)
  attendances: Attendance[];

  @OneToMany(() => Tasks, (task) => task.assignee)
  tasks: Tasks[];
}
