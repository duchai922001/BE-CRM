import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
export type TaskStatus = 'todo' | 'in_progress' | 'done';
@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ['todo', 'in_progress', 'done'],
    default: 'todo',
  })
  status: TaskStatus;

  @Column()
  assigneeId: number;

  // 👇 Quan hệ ManyToOne (User object đầy đủ)
  @ManyToOne(() => User, (user) => user.tasks, { eager: true })
  @JoinColumn({ name: 'assigneeId' }) // ánh xạ với assigneeId
  assignee: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
