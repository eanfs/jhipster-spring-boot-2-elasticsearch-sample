import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { RegionEsenComponent } from './region-esen.component';
import { RegionEsenDetailComponent } from './region-esen-detail.component';
import { RegionEsenPopupComponent } from './region-esen-dialog.component';
import { RegionEsenDeletePopupComponent } from './region-esen-delete-dialog.component';

export const regionRoute: Routes = [
    {
        path: 'region-esen',
        component: RegionEsenComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.region.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'region-esen/:id',
        component: RegionEsenDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.region.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const regionPopupRoute: Routes = [
    {
        path: 'region-esen-new',
        component: RegionEsenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.region.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'region-esen/:id/edit',
        component: RegionEsenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.region.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'region-esen/:id/delete',
        component: RegionEsenDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.region.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
