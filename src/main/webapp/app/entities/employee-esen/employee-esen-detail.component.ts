import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { IEmployeeEsen } from 'app/shared/model/employee-esen.model';
import { EmployeeEsenService } from './employee-esen.service';

@Component({
    selector: 'jhi-employee-esen-detail',
    templateUrl: './employee-esen-detail.component.html'
})
export class EmployeeEsenDetailComponent implements OnInit, OnDestroy {
    employee: IEmployeeEsen;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager, private employeeService: EmployeeEsenService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInEmployees();
    }

    load(id) {
        this.employeeService.find(id).subscribe((employeeResponse: HttpResponse<IEmployeeEsen>) => {
            this.employee = employeeResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmployees() {
        this.eventSubscriber = this.eventManager.subscribe('employeeListModification', response => this.load(this.employee.id));
    }
}
