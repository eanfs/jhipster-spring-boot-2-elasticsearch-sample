import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Jhipster5SharedModule } from 'app/shared';
import {
    RegionEsenService,
    RegionEsenPopupService,
    RegionEsenComponent,
    RegionEsenDetailComponent,
    RegionEsenDialogComponent,
    RegionEsenPopupComponent,
    RegionEsenDeletePopupComponent,
    RegionEsenDeleteDialogComponent,
    regionRoute,
    regionPopupRoute
} from './';

const ENTITY_STATES = [...regionRoute, ...regionPopupRoute];

@NgModule({
    imports: [Jhipster5SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RegionEsenComponent,
        RegionEsenDetailComponent,
        RegionEsenDialogComponent,
        RegionEsenDeleteDialogComponent,
        RegionEsenPopupComponent,
        RegionEsenDeletePopupComponent
    ],
    entryComponents: [
        RegionEsenComponent,
        RegionEsenDialogComponent,
        RegionEsenPopupComponent,
        RegionEsenDeleteDialogComponent,
        RegionEsenDeletePopupComponent
    ],
    providers: [RegionEsenService, RegionEsenPopupService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Jhipster5RegionEsenModule {}
