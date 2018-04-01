import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { CountryEsenComponent } from './country-esen.component';
import { CountryEsenDetailComponent } from './country-esen-detail.component';
import { CountryEsenPopupComponent } from './country-esen-dialog.component';
import { CountryEsenDeletePopupComponent } from './country-esen-delete-dialog.component';

export const countryRoute: Routes = [
    {
        path: 'country-esen',
        component: CountryEsenComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.country.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'country-esen/:id',
        component: CountryEsenDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.country.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const countryPopupRoute: Routes = [
    {
        path: 'country-esen-new',
        component: CountryEsenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.country.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'country-esen/:id/edit',
        component: CountryEsenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.country.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'country-esen/:id/delete',
        component: CountryEsenDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster5App.country.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
