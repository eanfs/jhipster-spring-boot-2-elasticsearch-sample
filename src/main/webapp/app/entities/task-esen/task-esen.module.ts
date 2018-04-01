import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Jhipster5SharedModule } from 'app/shared';
import {
    TaskEsenService,
    TaskEsenPopupService,
    TaskEsenComponent,
    TaskEsenDetailComponent,
    TaskEsenDialogComponent,
    TaskEsenPopupComponent,
    TaskEsenDeletePopupComponent,
    TaskEsenDeleteDialogComponent,
    taskRoute,
    taskPopupRoute
} from './';

const ENTITY_STATES = [...taskRoute, ...taskPopupRoute];

@NgModule({
    imports: [Jhipster5SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TaskEsenComponent,
        TaskEsenDetailComponent,
        TaskEsenDialogComponent,
        TaskEsenDeleteDialogComponent,
        TaskEsenPopupComponent,
        TaskEsenDeletePopupComponent
    ],
    entryComponents: [
        TaskEsenComponent,
        TaskEsenDialogComponent,
        TaskEsenPopupComponent,
        TaskEsenDeleteDialogComponent,
        TaskEsenDeletePopupComponent
    ],
    providers: [TaskEsenService, TaskEsenPopupService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Jhipster5TaskEsenModule {}
