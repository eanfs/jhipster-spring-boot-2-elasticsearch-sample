import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Jhipster5SharedModule } from 'app/shared';
import {
    EmployeeEsenService,
    EmployeeEsenPopupService,
    EmployeeEsenComponent,
    EmployeeEsenDetailComponent,
    EmployeeEsenDialogComponent,
    EmployeeEsenPopupComponent,
    EmployeeEsenDeletePopupComponent,
    EmployeeEsenDeleteDialogComponent,
    employeeRoute,
    employeePopupRoute
} from './';

const ENTITY_STATES = [...employeeRoute, ...employeePopupRoute];

@NgModule({
    imports: [Jhipster5SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EmployeeEsenComponent,
        EmployeeEsenDetailComponent,
        EmployeeEsenDialogComponent,
        EmployeeEsenDeleteDialogComponent,
        EmployeeEsenPopupComponent,
        EmployeeEsenDeletePopupComponent
    ],
    entryComponents: [
        EmployeeEsenComponent,
        EmployeeEsenDialogComponent,
        EmployeeEsenPopupComponent,
        EmployeeEsenDeleteDialogComponent,
        EmployeeEsenDeletePopupComponent
    ],
    providers: [EmployeeEsenService, EmployeeEsenPopupService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Jhipster5EmployeeEsenModule {}
