/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Jhipster5TestModule } from '../../../test.module';
import { JobHistoryEsenDetailComponent } from 'app/entities/job-history-esen/job-history-esen-detail.component';
import { JobHistoryEsenService } from 'app/entities/job-history-esen/job-history-esen.service';
import { JobHistoryEsen } from 'app/shared/model/job-history-esen.model';

describe('Component Tests', () => {
    describe('JobHistoryEsen Management Detail Component', () => {
        let comp: JobHistoryEsenDetailComponent;
        let fixture: ComponentFixture<JobHistoryEsenDetailComponent>;
        let service: JobHistoryEsenService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Jhipster5TestModule],
                declarations: [JobHistoryEsenDetailComponent],
                providers: [JobHistoryEsenService]
            })
                .overrideTemplate(JobHistoryEsenDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(JobHistoryEsenDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobHistoryEsenService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new JobHistoryEsen(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.jobHistory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
