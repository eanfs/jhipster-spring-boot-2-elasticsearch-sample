/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Jhipster5TestModule } from '../../../test.module';
import { CountryEsenDeleteDialogComponent } from 'app/entities/country-esen/country-esen-delete-dialog.component';
import { CountryEsenService } from 'app/entities/country-esen/country-esen.service';

describe('Component Tests', () => {
    describe('CountryEsen Management Delete Component', () => {
        let comp: CountryEsenDeleteDialogComponent;
        let fixture: ComponentFixture<CountryEsenDeleteDialogComponent>;
        let service: CountryEsenService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Jhipster5TestModule],
                declarations: [CountryEsenDeleteDialogComponent],
                providers: [CountryEsenService]
            })
                .overrideTemplate(CountryEsenDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CountryEsenDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountryEsenService);
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
