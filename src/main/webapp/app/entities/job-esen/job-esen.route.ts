import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { JobEsenComponent } from './job-esen.component';
import { JobEsenDetailComponent } from './job-esen-detail.component';
import { JobEsenPopupComponent } from './job-esen-dialog.component';
import { JobEsenDeletePopupComponent } from './job-esen-delete-dialog.component';

export const jobRoute: Routes = [
    {
        path: 'job-esen',
        component: JobEsenComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.job.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'job-esen/:id',
        component: JobEsenDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.job.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jobPopupRoute: Routes = [
    {
        path: 'job-esen-new',
        component: JobEsenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.job.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'job-esen/:id/edit',
        component: JobEsenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.job.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'job-esen/:id/delete',
        component: JobEsenDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.job.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
