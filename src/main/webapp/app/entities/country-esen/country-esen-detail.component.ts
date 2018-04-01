import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ICountryEsen } from 'app/shared/model/country-esen.model';
import { CountryEsenService } from './country-esen.service';

@Component({
    selector: 'jhi-country-esen-detail',
    templateUrl: './country-esen-detail.component.html'
})
export class CountryEsenDetailComponent implements OnInit, OnDestroy {
    country: ICountryEsen;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager, private countryService: CountryEsenService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInCountries();
    }

    load(id) {
        this.countryService.find(id).subscribe((countryResponse: HttpResponse<ICountryEsen>) => {
            this.country = countryResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCountries() {
        this.eventSubscriber = this.eventManager.subscribe('countryListModification', response => this.load(this.country.id));
    }
}
