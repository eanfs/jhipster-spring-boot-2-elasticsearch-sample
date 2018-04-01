import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRegionEsen } from 'app/shared/model/region-esen.model';
import { RegionEsenPopupService } from './region-esen-popup.service';
import { RegionEsenService } from './region-esen.service';

@Component({
    selector: 'jhi-region-esen-dialog',
    templateUrl: './region-esen-dialog.component.html'
})
export class RegionEsenDialogComponent implements OnInit {
    private _region: IRegionEsen;
    isSaving: boolean;

    constructor(public activeModal: NgbActiveModal, private regionService: RegionEsenService, private eventManager: JhiEventManager) {}

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.region.id !== undefined) {
            this.subscribeToSaveResponse(this.regionService.update(this.region));
        } else {
            this.subscribeToSaveResponse(this.regionService.create(this.region));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRegionEsen>>) {
        result.subscribe((res: HttpResponse<IRegionEsen>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: IRegionEsen) {
        this.eventManager.broadcast({ name: 'regionListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get region() {
        return this._region;
    }

    set region(region: IRegionEsen) {
        this._region = region;
    }
}

@Component({
    selector: 'jhi-region-esen-popup',
    template: ''
})
export class RegionEsenPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private regionPopupService: RegionEsenPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.regionPopupService.open(RegionEsenDialogComponent as Component, params['id']);
            } else {
                this.regionPopupService.open(RegionEsenDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
