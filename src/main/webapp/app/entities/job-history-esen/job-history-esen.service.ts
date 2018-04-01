import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IJobHistoryEsen } from 'app/shared/model/job-history-esen.model';

export type EntityResponseType = HttpResponse<IJobHistoryEsen>;
export type EntityArrayResponseType = HttpResponse<IJobHistoryEsen[]>;

@Injectable()
export class JobHistoryEsenService {
    private resourceUrl = SERVER_API_URL + 'api/job-histories';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/job-histories';

    constructor(private http: HttpClient) {}

    create(jobHistory: IJobHistoryEsen): Observable<EntityResponseType> {
        const copy = this.convert(jobHistory);
        return this.http
            .post<IJobHistoryEsen>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(jobHistory: IJobHistoryEsen): Observable<EntityResponseType> {
        const copy = this.convert(jobHistory);
        return this.http
            .put<IJobHistoryEsen>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IJobHistoryEsen>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IJobHistoryEsen[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IJobHistoryEsen[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: IJobHistoryEsen = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: EntityArrayResponseType): EntityArrayResponseType {
        const jsonResponse: IJobHistoryEsen[] = res.body;
        const body: IJobHistoryEsen[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to JobHistoryEsen.
     */
    private convertItemFromServer(jobHistory: IJobHistoryEsen): IJobHistoryEsen {
        const copy: IJobHistoryEsen = Object.assign({}, jobHistory, {
            startDate: jobHistory.startDate != null ? moment(jobHistory.startDate) : jobHistory.startDate,
            endDate: jobHistory.endDate != null ? moment(jobHistory.endDate) : jobHistory.endDate
        });
        return copy;
    }

    /**
     * Convert a JobHistoryEsen to a JSON which can be sent to the server.
     */
    private convert(jobHistory: IJobHistoryEsen): IJobHistoryEsen {
        const copy: IJobHistoryEsen = Object.assign({}, jobHistory, {
            startDate: jobHistory.startDate != null && jobHistory.startDate.isValid() ? jobHistory.startDate.toJSON() : null,
            endDate: jobHistory.endDate != null && jobHistory.endDate.isValid() ? jobHistory.endDate.toJSON() : null
        });
        return copy;
    }
}
