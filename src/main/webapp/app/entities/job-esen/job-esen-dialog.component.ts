import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IJobEsen } from 'app/shared/model/job-esen.model';
import { JobEsenPopupService } from './job-esen-popup.service';
import { JobEsenService } from './job-esen.service';
import { IEmployeeEsen } from 'app/shared/model/employee-esen.model';
import { EmployeeEsenService } from '../employee-esen';
import { ITaskEsen } from 'app/shared/model/task-esen.model';
import { TaskEsenService } from '../task-esen';

@Component({
    selector: 'jhi-job-esen-dialog',
    templateUrl: './job-esen-dialog.component.html'
})
export class JobEsenDialogComponent implements OnInit {
    private _job: IJobEsen;
    isSaving: boolean;

    employees: IEmployeeEsen[];

    tasks: ITaskEsen[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private jobService: JobEsenService,
        private employeeService: EmployeeEsenService,
        private taskService: TaskEsenService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.employeeService.query().subscribe(
            (res: HttpResponse<IEmployeeEsen[]>) => {
                this.employees = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.taskService.query().subscribe(
            (res: HttpResponse<ITaskEsen[]>) => {
                this.tasks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.job.id !== undefined) {
            this.subscribeToSaveResponse(this.jobService.update(this.job));
        } else {
            this.subscribeToSaveResponse(this.jobService.create(this.job));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IJobEsen>>) {
        result.subscribe((res: HttpResponse<IJobEsen>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: IJobEsen) {
        this.eventManager.broadcast({ name: 'jobListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackEmployeeById(index: number, item: IEmployeeEsen) {
        return item.id;
    }

    trackTaskById(index: number, item: ITaskEsen) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    get job() {
        return this._job;
    }

    set job(job: IJobEsen) {
        this._job = job;
    }
}

@Component({
    selector: 'jhi-job-esen-popup',
    template: ''
})
export class JobEsenPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private jobPopupService: JobEsenPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.jobPopupService.open(JobEsenDialogComponent as Component, params['id']);
            } else {
                this.jobPopupService.open(JobEsenDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
