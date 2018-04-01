/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Jhipster5TestModule } from '../../../test.module';
import { JobHistoryEsenDialogComponent } from 'app/entities/job-history-esen/job-history-esen-dialog.component';
import { JobHistoryEsenService } from 'app/entities/job-history-esen/job-history-esen.service';
import { JobHistoryEsen } from 'app/shared/model/job-history-esen.model';

import { JobEsenService } from 'app/entities/job-esen';
import { DepartmentEsenService } from 'app/entities/department-esen';
import { EmployeeEsenService } from 'app/entities/employee-esen';

describe('Component Tests', () => {
    describe('JobHistoryEsen Management Dialog Component', () => {
        let comp: JobHistoryEsenDialogComponent;
        let fixture: ComponentFixture<JobHistoryEsenDialogComponent>;
        let service: JobHistoryEsenService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Jhipster5TestModule],
                declarations: [JobHistoryEsenDialogComponent],
                providers: [JobEsenService, DepartmentEsenService, EmployeeEsenService, JobHistoryEsenService]
            })
                .overrideTemplate(JobHistoryEsenDialogComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(JobHistoryEsenDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobHistoryEsenService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new JobHistoryEsen(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.jobHistory = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'jobHistoryListModification', content: 'OK' });
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new JobHistoryEsen();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.jobHistory = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'jobHistoryListModification', content: 'OK' });
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                })
            );
        });
    });
});
