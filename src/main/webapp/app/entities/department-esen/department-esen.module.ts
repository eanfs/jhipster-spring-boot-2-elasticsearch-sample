import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Jhipster5SharedModule } from 'app/shared';
import {
    DepartmentEsenService,
    DepartmentEsenPopupService,
    DepartmentEsenComponent,
    DepartmentEsenDetailComponent,
    DepartmentEsenDialogComponent,
    DepartmentEsenPopupComponent,
    DepartmentEsenDeletePopupComponent,
    DepartmentEsenDeleteDialogComponent,
    departmentRoute,
    departmentPopupRoute
} from './';

const ENTITY_STATES = [...departmentRoute, ...departmentPopupRoute];

@NgModule({
    imports: [Jhipster5SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DepartmentEsenComponent,
        DepartmentEsenDetailComponent,
        DepartmentEsenDialogComponent,
        DepartmentEsenDeleteDialogComponent,
        DepartmentEsenPopupComponent,
        DepartmentEsenDeletePopupComponent
    ],
    entryComponents: [
        DepartmentEsenComponent,
        DepartmentEsenDialogComponent,
        DepartmentEsenPopupComponent,
        DepartmentEsenDeleteDialogComponent,
        DepartmentEsenDeletePopupComponent
    ],
    providers: [DepartmentEsenService, DepartmentEsenPopupService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Jhipster5DepartmentEsenModule {}
