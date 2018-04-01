/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Jhipster5TestModule } from '../../../test.module';
import { EmployeeEsenDetailComponent } from 'app/entities/employee-esen/employee-esen-detail.component';
import { EmployeeEsenService } from 'app/entities/employee-esen/employee-esen.service';
import { EmployeeEsen } from 'app/shared/model/employee-esen.model';

describe('Component Tests', () => {
    describe('EmployeeEsen Management Detail Component', () => {
        let comp: EmployeeEsenDetailComponent;
        let fixture: ComponentFixture<EmployeeEsenDetailComponent>;
        let service: EmployeeEsenService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Jhipster5TestModule],
                declarations: [EmployeeEsenDetailComponent],
                providers: [EmployeeEsenService]
            })
                .overrideTemplate(EmployeeEsenDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EmployeeEsenDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeeEsenService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new EmployeeEsen(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.employee).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
