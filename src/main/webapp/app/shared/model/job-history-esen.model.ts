import { Moment } from 'moment';

export const enum Language {
    'FRENCH',
    'ENGLISH',
    'SPANISH'
}

export interface IJobHistoryEsen {
    id?: number;
    startDate?: Moment;
    endDate?: Moment;
    language?: Language;
    jobId?: number;
    departmentId?: number;
    employeeId?: number;
}

export class JobHistoryEsen implements IJobHistoryEsen {
    constructor(
        public id?: number,
        public startDate?: Moment,
        public endDate?: Moment,
        public language?: Language,
        public jobId?: number,
        public departmentId?: number,
        public employeeId?: number
    ) {}
}
