import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { IEmployeeEsen, EmployeeEsen } from 'app/shared/model/employee-esen.model';
import { EmployeeEsenService } from './employee-esen.service';

@Injectable()
export class EmployeeEsenPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private employeeService: EmployeeEsenService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.employeeService.find(id).subscribe((employeeResponse: HttpResponse<IEmployeeEsen>) => {
                    const employee: IEmployeeEsen = employeeResponse.body;
                    this.ngbModalRef = this.employeeModalRef(component, employee);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.employeeModalRef(component, new EmployeeEsen());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    employeeModalRef(component: Component, employee: IEmployeeEsen): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.employee = employee;
        modalRef.result.then(
            result => {
                this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                this.ngbModalRef = null;
            },
            reason => {
                this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                this.ngbModalRef = null;
            }
        );
        return modalRef;
    }
}
