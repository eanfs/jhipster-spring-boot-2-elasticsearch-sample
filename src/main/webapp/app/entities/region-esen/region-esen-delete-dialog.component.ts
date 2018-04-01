import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRegionEsen } from 'app/shared/model/region-esen.model';
import { RegionEsenPopupService } from './region-esen-popup.service';
import { RegionEsenService } from './region-esen.service';

@Component({
    selector: 'jhi-region-esen-delete-dialog',
    templateUrl: './region-esen-delete-dialog.component.html'
})
export class RegionEsenDeleteDialogComponent {
    region: IRegionEsen;

    constructor(private regionService: RegionEsenService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.regionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'regionListModification',
                content: 'Deleted an region'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-region-esen-delete-popup',
    template: ''
})
export class RegionEsenDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private regionPopupService: RegionEsenPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.regionPopupService.open(RegionEsenDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
