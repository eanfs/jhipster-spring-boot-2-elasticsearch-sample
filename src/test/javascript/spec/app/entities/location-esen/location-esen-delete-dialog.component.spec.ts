/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Jhipster5TestModule } from '../../../test.module';
import { LocationEsenDeleteDialogComponent } from 'app/entities/location-esen/location-esen-delete-dialog.component';
import { LocationEsenService } from 'app/entities/location-esen/location-esen.service';

describe('Component Tests', () => {
    describe('LocationEsen Management Delete Component', () => {
        let comp: LocationEsenDeleteDialogComponent;
        let fixture: ComponentFixture<LocationEsenDeleteDialogComponent>;
        let service: LocationEsenService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Jhipster5TestModule],
                declarations: [LocationEsenDeleteDialogComponent],
                providers: [LocationEsenService]
            })
                .overrideTemplate(LocationEsenDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LocationEsenDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocationEsenService);
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
