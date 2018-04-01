import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJobHistoryEsen } from 'app/shared/model/job-history-esen.model';
import { JobHistoryEsenPopupService } from './job-history-esen-popup.service';
import { JobHistoryEsenService } from './job-history-esen.service';

@Component({
    selector: 'jhi-job-history-esen-delete-dialog',
    templateUrl: './job-history-esen-delete-dialog.component.html'
})
export class JobHistoryEsenDeleteDialogComponent {
    jobHistory: IJobHistoryEsen;

    constructor(
        private jobHistoryService: JobHistoryEsenService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jobHistoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'jobHistoryListModification',
                content: 'Deleted an jobHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-job-history-esen-delete-popup',
    template: ''
})
export class JobHistoryEsenDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private jobHistoryPopupService: JobHistoryEsenPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.jobHistoryPopupService.open(JobHistoryEsenDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
