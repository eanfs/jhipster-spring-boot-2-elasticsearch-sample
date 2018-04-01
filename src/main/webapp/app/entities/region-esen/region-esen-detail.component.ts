import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { IRegionEsen } from 'app/shared/model/region-esen.model';
import { RegionEsenService } from './region-esen.service';

@Component({
    selector: 'jhi-region-esen-detail',
    templateUrl: './region-esen-detail.component.html'
})
export class RegionEsenDetailComponent implements OnInit, OnDestroy {
    region: IRegionEsen;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager, private regionService: RegionEsenService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInRegions();
    }

    load(id) {
        this.regionService.find(id).subscribe((regionResponse: HttpResponse<IRegionEsen>) => {
            this.region = regionResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRegions() {
        this.eventSubscriber = this.eventManager.subscribe('regionListModification', response => this.load(this.region.id));
    }
}
