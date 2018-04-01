import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILocationEsen } from 'app/shared/model/location-esen.model';
import { LocationEsenPopupService } from './location-esen-popup.service';
import { LocationEsenService } from './location-esen.service';

@Component({
    selector: 'jhi-location-esen-delete-dialog',
    templateUrl: './location-esen-delete-dialog.component.html'
})
export class LocationEsenDeleteDialogComponent {
    location: ILocationEsen;

    constructor(private locationService: LocationEsenService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.locationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'locationListModification',
                content: 'Deleted an location'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-location-esen-delete-popup',
    template: ''
})
export class LocationEsenDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private locationPopupService: LocationEsenPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.locationPopupService.open(LocationEsenDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
