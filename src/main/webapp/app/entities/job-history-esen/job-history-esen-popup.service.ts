import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { IJobHistoryEsen, JobHistoryEsen } from 'app/shared/model/job-history-esen.model';
import { JobHistoryEsenService } from './job-history-esen.service';

@Injectable()
export class JobHistoryEsenPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private jobHistoryService: JobHistoryEsenService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.jobHistoryService.find(id).subscribe((jobHistoryResponse: HttpResponse<IJobHistoryEsen>) => {
                    const jobHistory: IJobHistoryEsen = jobHistoryResponse.body;
                    this.ngbModalRef = this.jobHistoryModalRef(component, jobHistory);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.jobHistoryModalRef(component, new JobHistoryEsen());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    jobHistoryModalRef(component: Component, jobHistory: IJobHistoryEsen): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.jobHistory = jobHistory;
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
