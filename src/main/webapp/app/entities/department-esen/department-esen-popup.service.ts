import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { IDepartmentEsen, DepartmentEsen } from 'app/shared/model/department-esen.model';
import { DepartmentEsenService } from './department-esen.service';

@Injectable()
export class DepartmentEsenPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private departmentService: DepartmentEsenService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.departmentService.find(id).subscribe((departmentResponse: HttpResponse<IDepartmentEsen>) => {
                    const department: IDepartmentEsen = departmentResponse.body;
                    this.ngbModalRef = this.departmentModalRef(component, department);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.departmentModalRef(component, new DepartmentEsen());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    departmentModalRef(component: Component, department: IDepartmentEsen): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.department = department;
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
