import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Jhipster5SharedModule } from 'app/shared';
import {
    JobHistoryEsenService,
    JobHistoryEsenPopupService,
    JobHistoryEsenComponent,
    JobHistoryEsenDetailComponent,
    JobHistoryEsenDialogComponent,
    JobHistoryEsenPopupComponent,
    JobHistoryEsenDeletePopupComponent,
    JobHistoryEsenDeleteDialogComponent,
    jobHistoryRoute,
    jobHistoryPopupRoute
} from './';

const ENTITY_STATES = [...jobHistoryRoute, ...jobHistoryPopupRoute];

@NgModule({
    imports: [Jhipster5SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        JobHistoryEsenComponent,
        JobHistoryEsenDetailComponent,
        JobHistoryEsenDialogComponent,
        JobHistoryEsenDeleteDialogComponent,
        JobHistoryEsenPopupComponent,
        JobHistoryEsenDeletePopupComponent
    ],
    entryComponents: [
        JobHistoryEsenComponent,
        JobHistoryEsenDialogComponent,
        JobHistoryEsenPopupComponent,
        JobHistoryEsenDeleteDialogComponent,
        JobHistoryEsenDeletePopupComponent
    ],
    providers: [JobHistoryEsenService, JobHistoryEsenPopupService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Jhipster5JobHistoryEsenModule {}
