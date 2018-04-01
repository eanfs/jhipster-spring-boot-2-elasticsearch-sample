/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Jhipster5TestModule } from '../../../test.module';
import { RegionEsenDetailComponent } from 'app/entities/region-esen/region-esen-detail.component';
import { RegionEsenService } from 'app/entities/region-esen/region-esen.service';
import { RegionEsen } from 'app/shared/model/region-esen.model';

describe('Component Tests', () => {
    describe('RegionEsen Management Detail Component', () => {
        let comp: RegionEsenDetailComponent;
        let fixture: ComponentFixture<RegionEsenDetailComponent>;
        let service: RegionEsenService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Jhipster5TestModule],
                declarations: [RegionEsenDetailComponent],
                providers: [RegionEsenService]
            })
                .overrideTemplate(RegionEsenDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RegionEsenDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegionEsenService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new RegionEsen(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.region).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
