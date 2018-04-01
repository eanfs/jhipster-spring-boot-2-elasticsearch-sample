import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { IDepartmentEsen } from 'app/shared/model/department-esen.model';
import { DepartmentEsenService } from './department-esen.service';

@Component({
    selector: 'jhi-department-esen-detail',
    templateUrl: './department-esen-detail.component.html'
})
export class DepartmentEsenDetailComponent implements OnInit, OnDestroy {
    department: IDepartmentEsen;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager, private departmentService: DepartmentEsenService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInDepartments();
    }

    load(id) {
        this.departmentService.find(id).subscribe((departmentResponse: HttpResponse<IDepartmentEsen>) => {
            this.department = departmentResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDepartments() {
        this.eventSubscriber = this.eventManager.subscribe('departmentListModification', response => this.load(this.department.id));
    }
}
