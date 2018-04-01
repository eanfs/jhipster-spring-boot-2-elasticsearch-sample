import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { JobHistoryEsenComponent } from './job-history-esen.component';
import { JobHistoryEsenDetailComponent } from './job-history-esen-detail.component';
import { JobHistoryEsenPopupComponent } from './job-history-esen-dialog.component';
import { JobHistoryEsenDeletePopupComponent } from './job-history-esen-delete-dialog.component';

export const jobHistoryRoute: Routes = [
    {
        path: 'job-history-esen',
        component: JobHistoryEsenComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'job-history-esen/:id',
        component: JobHistoryEsenDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jobHistoryPopupRoute: Routes = [
    {
        path: 'job-history-esen-new',
        component: JobHistoryEsenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'job-history-esen/:id/edit',
        component: JobHistoryEsenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'job-history-esen/:id/delete',
        component: JobHistoryEsenDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
