/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Jhipster5TestModule } from '../../../test.module';
import { JobEsenDetailComponent } from 'app/entities/job-esen/job-esen-detail.component';
import { JobEsenService } from 'app/entities/job-esen/job-esen.service';
import { JobEsen } from 'app/shared/model/job-esen.model';

describe('Component Tests', () => {
    describe('JobEsen Management Detail Component', () => {
        let comp: JobEsenDetailComponent;
        let fixture: ComponentFixture<JobEsenDetailComponent>;
        let service: JobEsenService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Jhipster5TestModule],
                declarations: [JobEsenDetailComponent],
                providers: [JobEsenService]
            })
                .overrideTemplate(JobEsenDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(JobEsenDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobEsenService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new JobEsen(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.job).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
