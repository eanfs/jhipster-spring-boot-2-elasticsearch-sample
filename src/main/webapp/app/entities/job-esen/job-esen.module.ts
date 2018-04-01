import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Jhipster5SharedModule } from 'app/shared';
import {
    JobEsenService,
    JobEsenPopupService,
    JobEsenComponent,
    JobEsenDetailComponent,
    JobEsenDialogComponent,
    JobEsenPopupComponent,
    JobEsenDeletePopupComponent,
    JobEsenDeleteDialogComponent,
    jobRoute,
    jobPopupRoute
} from './';

const ENTITY_STATES = [...jobRoute, ...jobPopupRoute];

@NgModule({
    imports: [Jhipster5SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        JobEsenComponent,
        JobEsenDetailComponent,
        JobEsenDialogComponent,
        JobEsenDeleteDialogComponent,
        JobEsenPopupComponent,
        JobEsenDeletePopupComponent
    ],
    entryComponents: [
        JobEsenComponent,
        JobEsenDialogComponent,
        JobEsenPopupComponent,
        JobEsenDeleteDialogComponent,
        JobEsenDeletePopupComponent
    ],
    providers: [JobEsenService, JobEsenPopupService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Jhipster5JobEsenModule {}
