import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  getTasks(taskFilterDto: GetTaskFilterDto, user:User): Promise<Task[]> {
    return this.taskRepository.getTasks(taskFilterDto, user);
  }

  async getTaskByID(id: number, user:User): Promise<Task> {
    const found = await this.taskRepository.findOne({where: {id, userId: user.id}});
    if (!found) {
      throw new NotFoundException(`Task with ID "${id} not found"`);
    }
    return found;
  }

  async createTask(createTask: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTask, user);
  }

  async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskByID(id, user);
    task.status = status;
    await task.save();
    return task;
  }

  async deleteTask(id: number, user: User): Promise<void> {
    const result = await this.taskRepository.delete({id, userId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id} not found"`);
    }
  }
}
