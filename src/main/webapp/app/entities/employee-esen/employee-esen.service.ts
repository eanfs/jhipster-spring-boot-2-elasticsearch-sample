import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEmployeeEsen } from 'app/shared/model/employee-esen.model';

export type EntityResponseType = HttpResponse<IEmployeeEsen>;
export type EntityArrayResponseType = HttpResponse<IEmployeeEsen[]>;

@Injectable()
export class EmployeeEsenService {
    private resourceUrl = SERVER_API_URL + 'api/employees';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/employees';

    constructor(private http: HttpClient) {}

    create(employee: IEmployeeEsen): Observable<EntityResponseType> {
        const copy = this.convert(employee);
        return this.http
            .post<IEmployeeEsen>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(employee: IEmployeeEsen): Observable<EntityResponseType> {
        const copy = this.convert(employee);
        return this.http
            .put<IEmployeeEsen>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IEmployeeEsen>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IEmployeeEsen[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IEmployeeEsen[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: IEmployeeEsen = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: EntityArrayResponseType): EntityArrayResponseType {
        const jsonResponse: IEmployeeEsen[] = res.body;
        const body: IEmployeeEsen[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to EmployeeEsen.
     */
    private convertItemFromServer(employee: IEmployeeEsen): IEmployeeEsen {
        const copy: IEmployeeEsen = Object.assign({}, employee, {
            hireDate: employee.hireDate != null ? moment(employee.hireDate) : employee.hireDate
        });
        return copy;
    }

    /**
     * Convert a EmployeeEsen to a JSON which can be sent to the server.
     */
    private convert(employee: IEmployeeEsen): IEmployeeEsen {
        const copy: IEmployeeEsen = Object.assign({}, employee, {
            hireDate: employee.hireDate != null && employee.hireDate.isValid() ? employee.hireDate.toJSON() : null
        });
        return copy;
    }
}
