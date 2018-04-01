/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Jhipster5TestModule } from '../../../test.module';
import { LocationEsenDialogComponent } from 'app/entities/location-esen/location-esen-dialog.component';
import { LocationEsenService } from 'app/entities/location-esen/location-esen.service';
import { LocationEsen } from 'app/shared/model/location-esen.model';

import { CountryEsenService } from 'app/entities/country-esen';

describe('Component Tests', () => {
    describe('LocationEsen Management Dialog Component', () => {
        let comp: LocationEsenDialogComponent;
        let fixture: ComponentFixture<LocationEsenDialogComponent>;
        let service: LocationEsenService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Jhipster5TestModule],
                declarations: [LocationEsenDialogComponent],
                providers: [CountryEsenService, LocationEsenService]
            })
                .overrideTemplate(LocationEsenDialogComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LocationEsenDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocationEsenService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new LocationEsen(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.location = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'locationListModification', content: 'OK' });
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new LocationEsen();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.location = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'locationListModification', content: 'OK' });
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                })
            );
        });
    });
});
