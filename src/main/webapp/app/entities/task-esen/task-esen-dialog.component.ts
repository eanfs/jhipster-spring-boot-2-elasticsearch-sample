import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITaskEsen } from 'app/shared/model/task-esen.model';
import { TaskEsenPopupService } from './task-esen-popup.service';
import { TaskEsenService } from './task-esen.service';
import { IJobEsen } from 'app/shared/model/job-esen.model';
import { JobEsenService } from '../job-esen';

@Component({
    selector: 'jhi-task-esen-dialog',
    templateUrl: './task-esen-dialog.component.html'
})
export class TaskEsenDialogComponent implements OnInit {
    private _task: ITaskEsen;
    isSaving: boolean;

    jobs: IJobEsen[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private taskService: TaskEsenService,
        private jobService: JobEsenService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.jobService.query().subscribe(
            (res: HttpResponse<IJobEsen[]>) => {
                this.jobs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.task.id !== undefined) {
            this.subscribeToSaveResponse(this.taskService.update(this.task));
        } else {
            this.subscribeToSaveResponse(this.taskService.create(this.task));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITaskEsen>>) {
        result.subscribe((res: HttpResponse<ITaskEsen>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ITaskEsen) {
        this.eventManager.broadcast({ name: 'taskListModification', content: 'OK' });
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
    get task() {
        return this._task;
    }

    set task(task: ITaskEsen) {
        this._task = task;
    }
}

@Component({
    selector: 'jhi-task-esen-popup',
    template: ''
})
export class TaskEsenPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private taskPopupService: TaskEsenPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.taskPopupService.open(TaskEsenDialogComponent as Component, params['id']);
            } else {
                this.taskPopupService.open(TaskEsenDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
