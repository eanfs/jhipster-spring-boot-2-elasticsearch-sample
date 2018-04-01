/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Jhipster5TestModule } from '../../../test.module';
import { DepartmentEsenDetailComponent } from 'app/entities/department-esen/department-esen-detail.component';
import { DepartmentEsenService } from 'app/entities/department-esen/department-esen.service';
import { DepartmentEsen } from 'app/shared/model/department-esen.model';

describe('Component Tests', () => {
    describe('DepartmentEsen Management Detail Component', () => {
        let comp: DepartmentEsenDetailComponent;
        let fixture: ComponentFixture<DepartmentEsenDetailComponent>;
        let service: DepartmentEsenService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Jhipster5TestModule],
                declarations: [DepartmentEsenDetailComponent],
                providers: [DepartmentEsenService]
            })
                .overrideTemplate(DepartmentEsenDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DepartmentEsenDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DepartmentEsenService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new DepartmentEsen(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.department).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
