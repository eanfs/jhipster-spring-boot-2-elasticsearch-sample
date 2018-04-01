import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { EmployeeEsenComponent } from './employee-esen.component';
import { EmployeeEsenDetailComponent } from './employee-esen-detail.component';
import { EmployeeEsenPopupComponent } from './employee-esen-dialog.component';
import { EmployeeEsenDeletePopupComponent } from './employee-esen-delete-dialog.component';

export const employeeRoute: Routes = [
    {
        path: 'employee-esen',
        component: EmployeeEsenComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.employee.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'employee-esen/:id',
        component: EmployeeEsenDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.employee.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const employeePopupRoute: Routes = [
    {
        path: 'employee-esen-new',
        component: EmployeeEsenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.employee.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'employee-esen/:id/edit',
        component: EmployeeEsenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.employee.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'employee-esen/:id/delete',
        component: EmployeeEsenDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.employee.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
