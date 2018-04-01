import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmployeeEsen } from 'app/shared/model/employee-esen.model';
import { EmployeeEsenPopupService } from './employee-esen-popup.service';
import { EmployeeEsenService } from './employee-esen.service';

@Component({
    selector: 'jhi-employee-esen-delete-dialog',
    templateUrl: './employee-esen-delete-dialog.component.html'
})
export class EmployeeEsenDeleteDialogComponent {
    employee: IEmployeeEsen;

    constructor(private employeeService: EmployeeEsenService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.employeeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'employeeListModification',
                content: 'Deleted an employee'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-employee-esen-delete-popup',
    template: ''
})
export class EmployeeEsenDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private employeePopupService: EmployeeEsenPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.employeePopupService.open(EmployeeEsenDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
