import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Jhipster5RegionEsenModule } from './region-esen/region-esen.module';
import { Jhipster5CountryEsenModule } from './country-esen/country-esen.module';
import { Jhipster5LocationEsenModule } from './location-esen/location-esen.module';
import { Jhipster5DepartmentEsenModule } from './department-esen/department-esen.module';
import { Jhipster5TaskEsenModule } from './task-esen/task-esen.module';
import { Jhipster5EmployeeEsenModule } from './employee-esen/employee-esen.module';
import { Jhipster5JobEsenModule } from './job-esen/job-esen.module';
import { Jhipster5JobHistoryEsenModule } from './job-history-esen/job-history-esen.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        Jhipster5RegionEsenModule,
        Jhipster5CountryEsenModule,
        Jhipster5LocationEsenModule,
        Jhipster5DepartmentEsenModule,
        Jhipster5TaskEsenModule,
        Jhipster5EmployeeEsenModule,
        Jhipster5JobEsenModule,
        Jhipster5JobHistoryEsenModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Jhipster5EntityModule {}
