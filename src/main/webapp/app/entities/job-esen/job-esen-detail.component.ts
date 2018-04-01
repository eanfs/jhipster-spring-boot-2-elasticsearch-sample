import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { IJobEsen } from 'app/shared/model/job-esen.model';
import { JobEsenService } from './job-esen.service';

@Component({
    selector: 'jhi-job-esen-detail',
    templateUrl: './job-esen-detail.component.html'
})
export class JobEsenDetailComponent implements OnInit, OnDestroy {
    job: IJobEsen;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager, private jobService: JobEsenService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInJobs();
    }

    load(id) {
        this.jobService.find(id).subscribe((jobResponse: HttpResponse<IJobEsen>) => {
            this.job = jobResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJobs() {
        this.eventSubscriber = this.eventManager.subscribe('jobListModification', response => this.load(this.job.id));
    }
}
