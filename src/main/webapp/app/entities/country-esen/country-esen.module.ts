import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Jhipster5SharedModule } from 'app/shared';
import {
    CountryEsenService,
    CountryEsenPopupService,
    CountryEsenComponent,
    CountryEsenDetailComponent,
    CountryEsenDialogComponent,
    CountryEsenPopupComponent,
    CountryEsenDeletePopupComponent,
    CountryEsenDeleteDialogComponent,
    countryRoute,
    countryPopupRoute
} from './';

const ENTITY_STATES = [...countryRoute, ...countryPopupRoute];

@NgModule({
    imports: [Jhipster5SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CountryEsenComponent,
        CountryEsenDetailComponent,
        CountryEsenDialogComponent,
        CountryEsenDeleteDialogComponent,
        CountryEsenPopupComponent,
        CountryEsenDeletePopupComponent
    ],
    entryComponents: [
        CountryEsenComponent,
        CountryEsenDialogComponent,
        CountryEsenPopupComponent,
        CountryEsenDeleteDialogComponent,
        CountryEsenDeletePopupComponent
    ],
    providers: [CountryEsenService, CountryEsenPopupService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Jhipster5CountryEsenModule {}
