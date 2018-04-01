import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITaskEsen } from 'app/shared/model/task-esen.model';

export type EntityResponseType = HttpResponse<ITaskEsen>;
export type EntityArrayResponseType = HttpResponse<ITaskEsen[]>;

@Injectable()
export class TaskEsenService {
    private resourceUrl = SERVER_API_URL + 'api/tasks';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/tasks';

    constructor(private http: HttpClient) {}

    create(task: ITaskEsen): Observable<EntityResponseType> {
        const copy = this.convert(task);
        return this.http
            .post<ITaskEsen>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(task: ITaskEsen): Observable<EntityResponseType> {
        const copy = this.convert(task);
        return this.http
            .put<ITaskEsen>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITaskEsen>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITaskEsen[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITaskEsen[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ITaskEsen = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: EntityArrayResponseType): EntityArrayResponseType {
        const jsonResponse: ITaskEsen[] = res.body;
        const body: ITaskEsen[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to TaskEsen.
     */
    private convertItemFromServer(task: ITaskEsen): ITaskEsen {
        const copy: ITaskEsen = Object.assign({}, task, {});
        return copy;
    }

    /**
     * Convert a TaskEsen to a JSON which can be sent to the server.
     */
    private convert(task: ITaskEsen): ITaskEsen {
        const copy: ITaskEsen = Object.assign({}, task, {});
        return copy;
    }
}
