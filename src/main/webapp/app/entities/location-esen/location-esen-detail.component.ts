import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ILocationEsen } from 'app/shared/model/location-esen.model';
import { LocationEsenService } from './location-esen.service';

@Component({
    selector: 'jhi-location-esen-detail',
    templateUrl: './location-esen-detail.component.html'
})
export class LocationEsenDetailComponent implements OnInit, OnDestroy {
    location: ILocationEsen;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager, private locationService: LocationEsenService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInLocations();
    }

    load(id) {
        this.locationService.find(id).subscribe((locationResponse: HttpResponse<ILocationEsen>) => {
            this.location = locationResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLocations() {
        this.eventSubscriber = this.eventManager.subscribe('locationListModification', response => this.load(this.location.id));
    }
}
