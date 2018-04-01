import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { DepartmentEsenComponent } from './department-esen.component';
import { DepartmentEsenDetailComponent } from './department-esen-detail.component';
import { DepartmentEsenPopupComponent } from './department-esen-dialog.component';
import { DepartmentEsenDeletePopupComponent } from './department-esen-delete-dialog.component';

export const departmentRoute: Routes = [
    {
        path: 'department-esen',
        component: DepartmentEsenComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.department.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'department-esen/:id',
        component: DepartmentEsenDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.department.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const departmentPopupRoute: Routes = [
    {
        path: 'department-esen-new',
        component: DepartmentEsenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.department.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'department-esen/:id/edit',
        component: DepartmentEsenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.department.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'department-esen/:id/delete',
        component: DepartmentEsenDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.department.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
