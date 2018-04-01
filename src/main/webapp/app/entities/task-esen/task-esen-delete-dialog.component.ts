import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITaskEsen } from 'app/shared/model/task-esen.model';
import { TaskEsenPopupService } from './task-esen-popup.service';
import { TaskEsenService } from './task-esen.service';

@Component({
    selector: 'jhi-task-esen-delete-dialog',
    templateUrl: './task-esen-delete-dialog.component.html'
})
export class TaskEsenDeleteDialogComponent {
    task: ITaskEsen;

    constructor(private taskService: TaskEsenService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.taskService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'taskListModification',
                content: 'Deleted an task'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-task-esen-delete-popup',
    template: ''
})
export class TaskEsenDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private taskPopupService: TaskEsenPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.taskPopupService.open(TaskEsenDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
