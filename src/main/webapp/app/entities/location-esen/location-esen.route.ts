import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { LocationEsenComponent } from './location-esen.component';
import { LocationEsenDetailComponent } from './location-esen-detail.component';
import { LocationEsenPopupComponent } from './location-esen-dialog.component';
import { LocationEsenDeletePopupComponent } from './location-esen-delete-dialog.component';

export const locationRoute: Routes = [
    {
        path: 'location-esen',
        component: LocationEsenComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.location.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'location-esen/:id',
        component: LocationEsenDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.location.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const locationPopupRoute: Routes = [
    {
        path: 'location-esen-new',
        component: LocationEsenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.location.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'location-esen/:id/edit',
        component: LocationEsenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.location.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'location-esen/:id/delete',
        component: LocationEsenDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.location.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
