import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDepartmentEsen } from 'app/shared/model/department-esen.model';

export type EntityResponseType = HttpResponse<IDepartmentEsen>;
export type EntityArrayResponseType = HttpResponse<IDepartmentEsen[]>;

@Injectable()
export class DepartmentEsenService {
    private resourceUrl = SERVER_API_URL + 'api/departments';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/departments';

    constructor(private http: HttpClient) {}

    create(department: IDepartmentEsen): Observable<EntityResponseType> {
        const copy = this.convert(department);
        return this.http
            .post<IDepartmentEsen>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(department: IDepartmentEsen): Observable<EntityResponseType> {
        const copy = this.convert(department);
        return this.http
            .put<IDepartmentEsen>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IDepartmentEsen>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDepartmentEsen[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDepartmentEsen[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: IDepartmentEsen = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: EntityArrayResponseType): EntityArrayResponseType {
        const jsonResponse: IDepartmentEsen[] = res.body;
        const body: IDepartmentEsen[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to DepartmentEsen.
     */
    private convertItemFromServer(department: IDepartmentEsen): IDepartmentEsen {
        const copy: IDepartmentEsen = Object.assign({}, department, {});
        return copy;
    }

    /**
     * Convert a DepartmentEsen to a JSON which can be sent to the server.
     */
    private convert(department: IDepartmentEsen): IDepartmentEsen {
        const copy: IDepartmentEsen = Object.assign({}, department, {});
        return copy;
    }
}
