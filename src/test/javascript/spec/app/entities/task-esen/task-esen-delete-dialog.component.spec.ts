/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Jhipster5TestModule } from '../../../test.module';
import { TaskEsenDeleteDialogComponent } from 'app/entities/task-esen/task-esen-delete-dialog.component';
import { TaskEsenService } from 'app/entities/task-esen/task-esen.service';

describe('Component Tests', () => {
    describe('TaskEsen Management Delete Component', () => {
        let comp: TaskEsenDeleteDialogComponent;
        let fixture: ComponentFixture<TaskEsenDeleteDialogComponent>;
        let service: TaskEsenService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Jhipster5TestModule],
                declarations: [TaskEsenDeleteDialogComponent],
                providers: [TaskEsenService]
            })
                .overrideTemplate(TaskEsenDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TaskEsenDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaskEsenService);
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
