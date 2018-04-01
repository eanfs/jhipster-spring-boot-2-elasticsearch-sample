/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Jhipster5TestModule } from '../../../test.module';
import { TaskEsenDetailComponent } from 'app/entities/task-esen/task-esen-detail.component';
import { TaskEsenService } from 'app/entities/task-esen/task-esen.service';
import { TaskEsen } from 'app/shared/model/task-esen.model';

describe('Component Tests', () => {
    describe('TaskEsen Management Detail Component', () => {
        let comp: TaskEsenDetailComponent;
        let fixture: ComponentFixture<TaskEsenDetailComponent>;
        let service: TaskEsenService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Jhipster5TestModule],
                declarations: [TaskEsenDetailComponent],
                providers: [TaskEsenService]
            })
                .overrideTemplate(TaskEsenDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TaskEsenDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaskEsenService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new TaskEsen(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.task).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
