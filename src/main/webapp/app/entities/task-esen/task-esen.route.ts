import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { TaskEsenComponent } from './task-esen.component';
import { TaskEsenDetailComponent } from './task-esen-detail.component';
import { TaskEsenPopupComponent } from './task-esen-dialog.component';
import { TaskEsenDeletePopupComponent } from './task-esen-delete-dialog.component';

export const taskRoute: Routes = [
    {
        path: 'task-esen',
        component: TaskEsenComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.task.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'task-esen/:id',
        component: TaskEsenDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.task.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const taskPopupRoute: Routes = [
    {
        path: 'task-esen-new',
        component: TaskEsenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.task.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'task-esen/:id/edit',
        component: TaskEsenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.task.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'task-esen/:id/delete',
        component: TaskEsenDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.task.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
