import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Jhipster5SharedModule } from 'app/shared';
import {
    LocationEsenService,
    LocationEsenPopupService,
    LocationEsenComponent,
    LocationEsenDetailComponent,
    LocationEsenDialogComponent,
    LocationEsenPopupComponent,
    LocationEsenDeletePopupComponent,
    LocationEsenDeleteDialogComponent,
    locationRoute,
    locationPopupRoute
} from './';

const ENTITY_STATES = [...locationRoute, ...locationPopupRoute];

@NgModule({
    imports: [Jhipster5SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LocationEsenComponent,
        LocationEsenDetailComponent,
        LocationEsenDialogComponent,
        LocationEsenDeleteDialogComponent,
        LocationEsenPopupComponent,
        LocationEsenDeletePopupComponent
    ],
    entryComponents: [
        LocationEsenComponent,
        LocationEsenDialogComponent,
        LocationEsenPopupComponent,
        LocationEsenDeleteDialogComponent,
        LocationEsenDeletePopupComponent
    ],
    providers: [LocationEsenService, LocationEsenPopupService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Jhipster5LocationEsenModule {}
