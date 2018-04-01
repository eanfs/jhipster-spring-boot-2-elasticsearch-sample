import { ITaskEsen } from './task-esen.model';

export interface IJobEsen {
    id?: number;
    jobTitle?: string;
    minSalary?: number;
    maxSalary?: number;
    employeeId?: number;
    tasks?: ITaskEsen[];
}

export class JobEsen implements IJobEsen {
    constructor(
        public id?: number,
        public jobTitle?: string,
        public minSalary?: number,
        public maxSalary?: number,
        public employeeId?: number,
        public tasks?: ITaskEsen[]
    ) {}
}
