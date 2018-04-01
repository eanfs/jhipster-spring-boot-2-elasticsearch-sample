import { IJobEsen } from './job-esen.model';

export interface ITaskEsen {
    id?: number;
    title?: string;
    description?: string;
    jobs?: IJobEsen[];
}

export class TaskEsen implements ITaskEsen {
    constructor(public id?: number, public title?: string, public description?: string, public jobs?: IJobEsen[]) {}
}
