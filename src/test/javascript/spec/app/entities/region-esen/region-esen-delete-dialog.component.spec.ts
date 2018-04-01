/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Jhipster5TestModule } from '../../../test.module';
import { RegionEsenDeleteDialogComponent } from 'app/entities/region-esen/region-esen-delete-dialog.component';
import { RegionEsenService } from 'app/entities/region-esen/region-esen.service';

describe('Component Tests', () => {
    describe('RegionEsen Management Delete Component', () => {
        let comp: RegionEsenDeleteDialogComponent;
        let fixture: ComponentFixture<RegionEsenDeleteDialogComponent>;
        let service: RegionEsenService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Jhipster5TestModule],
                declarations: [RegionEsenDeleteDialogComponent],
                providers: [RegionEsenService]
            })
                .overrideTemplate(RegionEsenDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RegionEsenDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegionEsenService);
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
