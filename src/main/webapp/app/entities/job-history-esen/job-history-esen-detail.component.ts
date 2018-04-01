import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { IJobHistoryEsen } from 'app/shared/model/job-history-esen.model';
import { JobHistoryEsenService } from './job-history-esen.service';

@Component({
    selector: 'jhi-job-history-esen-detail',
    templateUrl: './job-history-esen-detail.component.html'
})
export class JobHistoryEsenDetailComponent implements OnInit, OnDestroy {
    jobHistory: IJobHistoryEsen;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager, private jobHistoryService: JobHistoryEsenService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInJobHistories();
    }

    load(id) {
        this.jobHistoryService.find(id).subscribe((jobHistoryResponse: HttpResponse<IJobHistoryEsen>) => {
            this.jobHistory = jobHistoryResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJobHistories() {
        this.eventSubscriber = this.eventManager.subscribe('jobHistoryListModification', response => this.load(this.jobHistory.id));
    }
}
