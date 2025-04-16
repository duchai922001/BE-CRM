import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.attendances)
  user: User;

  @Column({ type: 'timestamp', nullable: true })
  checkinAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  checkoutAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
