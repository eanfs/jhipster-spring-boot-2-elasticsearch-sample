import { Moment } from 'moment';
import { IJobEsen } from './job-esen.model';

export interface IEmployeeEsen {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    hireDate?: Moment;
    salary?: number;
    commissionPct?: number;
    departmentId?: number;
    jobs?: IJobEsen[];
    managerId?: number;
}

export class EmployeeEsen implements IEmployeeEsen {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public phoneNumber?: string,
        public hireDate?: Moment,
        public salary?: number,
        public commissionPct?: number,
        public departmentId?: number,
        public jobs?: IJobEsen[],
        public managerId?: number
    ) {}
}
