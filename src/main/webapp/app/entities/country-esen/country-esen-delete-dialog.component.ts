import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICountryEsen } from 'app/shared/model/country-esen.model';
import { CountryEsenPopupService } from './country-esen-popup.service';
import { CountryEsenService } from './country-esen.service';

@Component({
    selector: 'jhi-country-esen-delete-dialog',
    templateUrl: './country-esen-delete-dialog.component.html'
})
export class CountryEsenDeleteDialogComponent {
    country: ICountryEsen;

    constructor(private countryService: CountryEsenService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.countryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'countryListModification',
                content: 'Deleted an country'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-country-esen-delete-popup',
    template: ''
})
export class CountryEsenDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private countryPopupService: CountryEsenPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.countryPopupService.open(CountryEsenDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
