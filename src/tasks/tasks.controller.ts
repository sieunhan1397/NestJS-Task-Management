import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilter } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipe/task-status-validation.pipe';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilter): Task[] {
        if(Object.keys(filterDto).length){
            return this.tasksService.getTasksByFilter(filterDto);
        } else{
            return this.tasksService.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskByID(@Param('id') id: string): Task {
        return this.tasksService.getTaskByID(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTask: CreateTaskDto):Task {
        return this.tasksService.createTask(createTask);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus):Task {
        return this.tasksService.updateTaskStatus(id, status);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        return this.tasksService.deleteTask(id)
    }
}
