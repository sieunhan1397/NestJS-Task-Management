import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  Unique, OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Task } from '../tasks/task.entity';
@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;
  
  @OneToMany(type => Task, task => task.user, {eager: true})
  tasks: Task[];

  async checkPassword(password: string): Promise<boolean> {
    const match = await bcrypt.compare(password, this.password);
    if (match) return true;
    return false;
  }
}
