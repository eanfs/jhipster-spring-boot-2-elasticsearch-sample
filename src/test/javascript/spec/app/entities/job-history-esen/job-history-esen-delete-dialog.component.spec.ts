/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Jhipster5TestModule } from '../../../test.module';
import { JobHistoryEsenDeleteDialogComponent } from 'app/entities/job-history-esen/job-history-esen-delete-dialog.component';
import { JobHistoryEsenService } from 'app/entities/job-history-esen/job-history-esen.service';

describe('Component Tests', () => {
    describe('JobHistoryEsen Management Delete Component', () => {
        let comp: JobHistoryEsenDeleteDialogComponent;
        let fixture: ComponentFixture<JobHistoryEsenDeleteDialogComponent>;
        let service: JobHistoryEsenService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Jhipster5TestModule],
                declarations: [JobHistoryEsenDeleteDialogComponent],
                providers: [JobHistoryEsenService]
            })
                .overrideTemplate(JobHistoryEsenDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(JobHistoryEsenDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobHistoryEsenService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
