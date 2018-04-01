import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEmployeeEsen } from 'app/shared/model/employee-esen.model';
import { EmployeeEsenPopupService } from './employee-esen-popup.service';
import { EmployeeEsenService } from './employee-esen.service';
import { IDepartmentEsen } from 'app/shared/model/department-esen.model';
import { DepartmentEsenService } from '../department-esen';

@Component({
    selector: 'jhi-employee-esen-dialog',
    templateUrl: './employee-esen-dialog.component.html'
})
export class EmployeeEsenDialogComponent implements OnInit {
    private _employee: IEmployeeEsen;
    isSaving: boolean;

    departments: IDepartmentEsen[];

    employees: IEmployeeEsen[];
    hireDate: string;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private employeeService: EmployeeEsenService,
        private departmentService: DepartmentEsenService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.departmentService.query().subscribe(
            (res: HttpResponse<IDepartmentEsen[]>) => {
                this.departments = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.employeeService.query().subscribe(
            (res: HttpResponse<IEmployeeEsen[]>) => {
                this.employees = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.employee.hireDate = moment(this.hireDate, DATE_TIME_FORMAT);
        if (this.employee.id !== undefined) {
            this.subscribeToSaveResponse(this.employeeService.update(this.employee));
        } else {
            this.subscribeToSaveResponse(this.employeeService.create(this.employee));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEmployeeEsen>>) {
        result.subscribe(
            (res: HttpResponse<IEmployeeEsen>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: IEmployeeEsen) {
        this.eventManager.broadcast({ name: 'employeeListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackDepartmentById(index: number, item: IDepartmentEsen) {
        return item.id;
    }

    trackEmployeeById(index: number, item: IEmployeeEsen) {
        return item.id;
    }
    get employee() {
        return this._employee;
    }

    set employee(employee: IEmployeeEsen) {
        this._employee = employee;
        this.hireDate = moment(employee.hireDate).format();
    }
}

@Component({
    selector: 'jhi-employee-esen-popup',
    template: ''
})
export class EmployeeEsenPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private employeePopupService: EmployeeEsenPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.employeePopupService.open(EmployeeEsenDialogComponent as Component, params['id']);
            } else {
                this.employeePopupService.open(EmployeeEsenDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
