/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Jhipster5TestModule } from '../../../test.module';
import { LocationEsenDetailComponent } from 'app/entities/location-esen/location-esen-detail.component';
import { LocationEsenService } from 'app/entities/location-esen/location-esen.service';
import { LocationEsen } from 'app/shared/model/location-esen.model';

describe('Component Tests', () => {
    describe('LocationEsen Management Detail Component', () => {
        let comp: LocationEsenDetailComponent;
        let fixture: ComponentFixture<LocationEsenDetailComponent>;
        let service: LocationEsenService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Jhipster5TestModule],
                declarations: [LocationEsenDetailComponent],
                providers: [LocationEsenService]
            })
                .overrideTemplate(LocationEsenDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LocationEsenDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocationEsenService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new LocationEsen(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.location).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
