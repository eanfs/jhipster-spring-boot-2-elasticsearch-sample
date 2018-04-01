import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJobEsen } from 'app/shared/model/job-esen.model';
import { JobEsenPopupService } from './job-esen-popup.service';
import { JobEsenService } from './job-esen.service';

@Component({
    selector: 'jhi-job-esen-delete-dialog',
    templateUrl: './job-esen-delete-dialog.component.html'
})
export class JobEsenDeleteDialogComponent {
    job: IJobEsen;

    constructor(private jobService: JobEsenService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jobService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'jobListModification',
                content: 'Deleted an job'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-job-esen-delete-popup',
    template: ''
})
export class JobEsenDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private jobPopupService: JobEsenPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.jobPopupService.open(JobEsenDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
