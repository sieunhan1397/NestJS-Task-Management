import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ]

    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase();
        if(!this.isValidStatus(value)){
            throw new BadRequestException(`${value} is an invalid status`);
        }
        return value;
    }

    private isValidStatus(status: any): Boolean {
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1 ;
    }

}