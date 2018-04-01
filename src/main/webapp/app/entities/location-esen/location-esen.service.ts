import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILocationEsen } from 'app/shared/model/location-esen.model';

export type EntityResponseType = HttpResponse<ILocationEsen>;
export type EntityArrayResponseType = HttpResponse<ILocationEsen[]>;

@Injectable()
export class LocationEsenService {
    private resourceUrl = SERVER_API_URL + 'api/locations';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/locations';

    constructor(private http: HttpClient) {}

    create(location: ILocationEsen): Observable<EntityResponseType> {
        const copy = this.convert(location);
        return this.http
            .post<ILocationEsen>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(location: ILocationEsen): Observable<EntityResponseType> {
        const copy = this.convert(location);
        return this.http
            .put<ILocationEsen>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ILocationEsen>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ILocationEsen[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ILocationEsen[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ILocationEsen = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: EntityArrayResponseType): EntityArrayResponseType {
        const jsonResponse: ILocationEsen[] = res.body;
        const body: ILocationEsen[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to LocationEsen.
     */
    private convertItemFromServer(location: ILocationEsen): ILocationEsen {
        const copy: ILocationEsen = Object.assign({}, location, {});
        return copy;
    }

    /**
     * Convert a LocationEsen to a JSON which can be sent to the server.
     */
    private convert(location: ILocationEsen): ILocationEsen {
        const copy: ILocationEsen = Object.assign({}, location, {});
        return copy;
    }
}
