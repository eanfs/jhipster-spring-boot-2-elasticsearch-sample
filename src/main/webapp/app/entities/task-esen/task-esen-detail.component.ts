import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ITaskEsen } from 'app/shared/model/task-esen.model';
import { TaskEsenService } from './task-esen.service';

@Component({
    selector: 'jhi-task-esen-detail',
    templateUrl: './task-esen-detail.component.html'
})
export class TaskEsenDetailComponent implements OnInit, OnDestroy {
    task: ITaskEsen;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager, private taskService: TaskEsenService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInTasks();
    }

    load(id) {
        this.taskService.find(id).subscribe((taskResponse: HttpResponse<ITaskEsen>) => {
            this.task = taskResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTasks() {
        this.eventSubscriber = this.eventManager.subscribe('taskListModification', response => this.load(this.task.id));
    }
}
