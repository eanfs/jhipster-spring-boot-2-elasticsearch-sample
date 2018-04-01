import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILocationEsen } from 'app/shared/model/location-esen.model';
import { LocationEsenPopupService } from './location-esen-popup.service';
import { LocationEsenService } from './location-esen.service';
import { ICountryEsen } from 'app/shared/model/country-esen.model';
import { CountryEsenService } from '../country-esen';

@Component({
    selector: 'jhi-location-esen-dialog',
    templateUrl: './location-esen-dialog.component.html'
})
export class LocationEsenDialogComponent implements OnInit {
    private _location: ILocationEsen;
    isSaving: boolean;

    countries: ICountryEsen[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private locationService: LocationEsenService,
        private countryService: CountryEsenService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.countryService.query({ filter: 'location-is-null' }).subscribe(
            (res: HttpResponse<ICountryEsen[]>) => {
                if (!this.location.countryId) {
                    this.countries = res.body;
                } else {
                    this.countryService.find(this.location.countryId).subscribe(
                        (subRes: HttpResponse<ICountryEsen>) => {
                            this.countries = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.location.id !== undefined) {
            this.subscribeToSaveResponse(this.locationService.update(this.location));
        } else {
            this.subscribeToSaveResponse(this.locationService.create(this.location));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILocationEsen>>) {
        result.subscribe(
            (res: HttpResponse<ILocationEsen>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: ILocationEsen) {
        this.eventManager.broadcast({ name: 'locationListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCountryById(index: number, item: ICountryEsen) {
        return item.id;
    }
    get location() {
        return this._location;
    }

    set location(location: ILocationEsen) {
        this._location = location;
    }
}

@Component({
    selector: 'jhi-location-esen-popup',
    template: ''
})
export class LocationEsenPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private locationPopupService: LocationEsenPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.locationPopupService.open(LocationEsenDialogComponent as Component, params['id']);
            } else {
                this.locationPopupService.open(LocationEsenDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
