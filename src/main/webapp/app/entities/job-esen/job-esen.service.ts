import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IJobEsen } from 'app/shared/model/job-esen.model';

export type EntityResponseType = HttpResponse<IJobEsen>;
export type EntityArrayResponseType = HttpResponse<IJobEsen[]>;

@Injectable()
export class JobEsenService {
    private resourceUrl = SERVER_API_URL + 'api/jobs';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/jobs';

    constructor(private http: HttpClient) {}

    create(job: IJobEsen): Observable<EntityResponseType> {
        const copy = this.convert(job);
        return this.http
            .post<IJobEsen>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(job: IJobEsen): Observable<EntityResponseType> {
        const copy = this.convert(job);
        return this.http
            .put<IJobEsen>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IJobEsen>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IJobEsen[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IJobEsen[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: IJobEsen = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: EntityArrayResponseType): EntityArrayResponseType {
        const jsonResponse: IJobEsen[] = res.body;
        const body: IJobEsen[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to JobEsen.
     */
    private convertItemFromServer(job: IJobEsen): IJobEsen {
        const copy: IJobEsen = Object.assign({}, job, {});
        return copy;
    }

    /**
     * Convert a JobEsen to a JSON which can be sent to the server.
     */
    private convert(job: IJobEsen): IJobEsen {
        const copy: IJobEsen = Object.assign({}, job, {});
        return copy;
    }
}
