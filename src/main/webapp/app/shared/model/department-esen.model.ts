import { IEmployeeEsen } from './employee-esen.model';

export interface IDepartmentEsen {
    id?: number;
    departmentName?: string;
    locationId?: number;
    employees?: IEmployeeEsen[];
}

export class DepartmentEsen implements IDepartmentEsen {
    constructor(public id?: number, public departmentName?: string, public locationId?: number, public employees?: IEmployeeEsen[]) {}
}
