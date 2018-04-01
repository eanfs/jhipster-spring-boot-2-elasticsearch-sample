import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDepartmentEsen } from 'app/shared/model/department-esen.model';
import { DepartmentEsenPopupService } from './department-esen-popup.service';
import { DepartmentEsenService } from './department-esen.service';

@Component({
    selector: 'jhi-department-esen-delete-dialog',
    templateUrl: './department-esen-delete-dialog.component.html'
})
export class DepartmentEsenDeleteDialogComponent {
    department: IDepartmentEsen;

    constructor(
        private departmentService: DepartmentEsenService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.departmentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'departmentListModification',
                content: 'Deleted an department'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-department-esen-delete-popup',
    template: ''
})
export class DepartmentEsenDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private departmentPopupService: DepartmentEsenPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.departmentPopupService.open(DepartmentEsenDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
