/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Jhipster5TestModule } from '../../../test.module';
import { DepartmentEsenDeleteDialogComponent } from 'app/entities/department-esen/department-esen-delete-dialog.component';
import { DepartmentEsenService } from 'app/entities/department-esen/department-esen.service';

describe('Component Tests', () => {
    describe('DepartmentEsen Management Delete Component', () => {
        let comp: DepartmentEsenDeleteDialogComponent;
        let fixture: ComponentFixture<DepartmentEsenDeleteDialogComponent>;
        let service: DepartmentEsenService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Jhipster5TestModule],
                declarations: [DepartmentEsenDeleteDialogComponent],
                providers: [DepartmentEsenService]
            })
                .overrideTemplate(DepartmentEsenDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DepartmentEsenDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DepartmentEsenService);
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
