import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IJobHistoryEsen } from 'app/shared/model/job-history-esen.model';
import { JobHistoryEsenPopupService } from './job-history-esen-popup.service';
import { JobHistoryEsenService } from './job-history-esen.service';
import { IJobEsen } from 'app/shared/model/job-esen.model';
import { JobEsenService } from '../job-esen';
import { IDepartmentEsen } from 'app/shared/model/department-esen.model';
import { DepartmentEsenService } from '../department-esen';
import { IEmployeeEsen } from 'app/shared/model/employee-esen.model';
import { EmployeeEsenService } from '../employee-esen';

@Component({
    selector: 'jhi-job-history-esen-dialog',
    templateUrl: './job-history-esen-dialog.component.html'
})
export class JobHistoryEsenDialogComponent implements OnInit {
    private _jobHistory: IJobHistoryEsen;
    isSaving: boolean;

    jobs: IJobEsen[];

    departments: IDepartmentEsen[];

    employees: IEmployeeEsen[];
    startDate: string;
    endDate: string;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private jobHistoryService: JobHistoryEsenService,
        private jobService: JobEsenService,
        private departmentService: DepartmentEsenService,
        private employeeService: EmployeeEsenService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.jobService.query({ filter: 'jobhistory-is-null' }).subscribe(
            (res: HttpResponse<IJobEsen[]>) => {
                if (!this.jobHistory.jobId) {
                    this.jobs = res.body;
                } else {
                    this.jobService.find(this.jobHistory.jobId).subscribe(
                        (subRes: HttpResponse<IJobEsen>) => {
                            this.jobs = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.departmentService.query({ filter: 'jobhistory-is-null' }).subscribe(
            (res: HttpResponse<IDepartmentEsen[]>) => {
                if (!this.jobHistory.departmentId) {
                    this.departments = res.body;
                } else {
                    this.departmentService.find(this.jobHistory.departmentId).subscribe(
                        (subRes: HttpResponse<IDepartmentEsen>) => {
                            this.departments = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.employeeService.query({ filter: 'jobhistory-is-null' }).subscribe(
            (res: HttpResponse<IEmployeeEsen[]>) => {
                if (!this.jobHistory.employeeId) {
                    this.employees = res.body;
                } else {
                    this.employeeService.find(this.jobHistory.employeeId).subscribe(
                        (subRes: HttpResponse<IEmployeeEsen>) => {
                            this.employees = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.jobHistory.startDate = moment(this.startDate, DATE_TIME_FORMAT);
        this.jobHistory.endDate = moment(this.endDate, DATE_TIME_FORMAT);
        if (this.jobHistory.id !== undefined) {
            this.subscribeToSaveResponse(this.jobHistoryService.update(this.jobHistory));
        } else {
            this.subscribeToSaveResponse(this.jobHistoryService.create(this.jobHistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IJobHistoryEsen>>) {
        result.subscribe(
            (res: HttpResponse<IJobHistoryEsen>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: IJobHistoryEsen) {
        this.eventManager.broadcast({ name: 'jobHistoryListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackJobById(index: number, item: IJobEsen) {
        return item.id;
    }

    trackDepartmentById(index: number, item: IDepartmentEsen) {
        return item.id;
    }

    trackEmployeeById(index: number, item: IEmployeeEsen) {
        return item.id;
    }
    get jobHistory() {
        return this._jobHistory;
    }

    set jobHistory(jobHistory: IJobHistoryEsen) {
        this._jobHistory = jobHistory;
        this.startDate = moment(jobHistory.startDate).format();
        this.endDate = moment(jobHistory.endDate).format();
    }
}

@Component({
    selector: 'jhi-job-history-esen-popup',
    template: ''
})
export class JobHistoryEsenPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private jobHistoryPopupService: JobHistoryEsenPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.jobHistoryPopupService.open(JobHistoryEsenDialogComponent as Component, params['id']);
            } else {
                this.jobHistoryPopupService.open(JobHistoryEsenDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
