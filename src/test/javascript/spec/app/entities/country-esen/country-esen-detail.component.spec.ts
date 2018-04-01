/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Jhipster5TestModule } from '../../../test.module';
import { CountryEsenDetailComponent } from 'app/entities/country-esen/country-esen-detail.component';
import { CountryEsenService } from 'app/entities/country-esen/country-esen.service';
import { CountryEsen } from 'app/shared/model/country-esen.model';

describe('Component Tests', () => {
    describe('CountryEsen Management Detail Component', () => {
        let comp: CountryEsenDetailComponent;
        let fixture: ComponentFixture<CountryEsenDetailComponent>;
        let service: CountryEsenService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Jhipster5TestModule],
                declarations: [CountryEsenDetailComponent],
                providers: [CountryEsenService]
            })
                .overrideTemplate(CountryEsenDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CountryEsenDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountryEsenService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new CountryEsen(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.country).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
