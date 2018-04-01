import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDepartmentEsen } from 'app/shared/model/department-esen.model';
import { DepartmentEsenPopupService } from './department-esen-popup.service';
import { DepartmentEsenService } from './department-esen.service';
import { ILocationEsen } from 'app/shared/model/location-esen.model';
import { LocationEsenService } from '../location-esen';

@Component({
    selector: 'jhi-department-esen-dialog',
    templateUrl: './department-esen-dialog.component.html'
})
export class DepartmentEsenDialogComponent implements OnInit {
    private _department: IDepartmentEsen;
    isSaving: boolean;

    locations: ILocationEsen[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private departmentService: DepartmentEsenService,
        private locationService: LocationEsenService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.locationService.query({ filter: 'department-is-null' }).subscribe(
            (res: HttpResponse<ILocationEsen[]>) => {
                if (!this.department.locationId) {
                    this.locations = res.body;
                } else {
                    this.locationService.find(this.department.locationId).subscribe(
                        (subRes: HttpResponse<ILocationEsen>) => {
                            this.locations = [subRes.body].concat(res.body);
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
        if (this.department.id !== undefined) {
            this.subscribeToSaveResponse(this.departmentService.update(this.department));
        } else {
            this.subscribeToSaveResponse(this.departmentService.create(this.department));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDepartmentEsen>>) {
        result.subscribe(
            (res: HttpResponse<IDepartmentEsen>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: IDepartmentEsen) {
        this.eventManager.broadcast({ name: 'departmentListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackLocationById(index: number, item: ILocationEsen) {
        return item.id;
    }
    get department() {
        return this._department;
    }

    set department(department: IDepartmentEsen) {
        this._department = department;
    }
}

@Component({
    selector: 'jhi-department-esen-popup',
    template: ''
})
export class DepartmentEsenPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private departmentPopupService: DepartmentEsenPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.departmentPopupService.open(DepartmentEsenDialogComponent as Component, params['id']);
            } else {
                this.departmentPopupService.open(DepartmentEsenDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
