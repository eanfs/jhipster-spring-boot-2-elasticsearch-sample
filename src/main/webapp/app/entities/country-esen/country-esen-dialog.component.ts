import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICountryEsen } from 'app/shared/model/country-esen.model';
import { CountryEsenPopupService } from './country-esen-popup.service';
import { CountryEsenService } from './country-esen.service';
import { IRegionEsen } from 'app/shared/model/region-esen.model';
import { RegionEsenService } from '../region-esen';

@Component({
    selector: 'jhi-country-esen-dialog',
    templateUrl: './country-esen-dialog.component.html'
})
export class CountryEsenDialogComponent implements OnInit {
    private _country: ICountryEsen;
    isSaving: boolean;

    regions: IRegionEsen[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private countryService: CountryEsenService,
        private regionService: RegionEsenService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.regionService.query({ filter: 'country-is-null' }).subscribe(
            (res: HttpResponse<IRegionEsen[]>) => {
                if (!this.country.regionId) {
                    this.regions = res.body;
                } else {
                    this.regionService.find(this.country.regionId).subscribe(
                        (subRes: HttpResponse<IRegionEsen>) => {
                            this.regions = [subRes.body].concat(res.body);
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
        if (this.country.id !== undefined) {
            this.subscribeToSaveResponse(this.countryService.update(this.country));
        } else {
            this.subscribeToSaveResponse(this.countryService.create(this.country));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICountryEsen>>) {
        result.subscribe((res: HttpResponse<ICountryEsen>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ICountryEsen) {
        this.eventManager.broadcast({ name: 'countryListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackRegionById(index: number, item: IRegionEsen) {
        return item.id;
    }
    get country() {
        return this._country;
    }

    set country(country: ICountryEsen) {
        this._country = country;
    }
}

@Component({
    selector: 'jhi-country-esen-popup',
    template: ''
})
export class CountryEsenPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private countryPopupService: CountryEsenPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.countryPopupService.open(CountryEsenDialogComponent as Component, params['id']);
            } else {
                this.countryPopupService.open(CountryEsenDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
