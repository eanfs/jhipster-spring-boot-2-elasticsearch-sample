import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRegionEsen } from 'app/shared/model/region-esen.model';

export type EntityResponseType = HttpResponse<IRegionEsen>;
export type EntityArrayResponseType = HttpResponse<IRegionEsen[]>;

@Injectable()
export class RegionEsenService {
    private resourceUrl = SERVER_API_URL + 'api/regions';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/regions';

    constructor(private http: HttpClient) {}

    create(region: IRegionEsen): Observable<EntityResponseType> {
        const copy = this.convert(region);
        return this.http
            .post<IRegionEsen>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(region: IRegionEsen): Observable<EntityResponseType> {
        const copy = this.convert(region);
        return this.http
            .put<IRegionEsen>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IRegionEsen>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRegionEsen[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRegionEsen[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: IRegionEsen = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: EntityArrayResponseType): EntityArrayResponseType {
        const jsonResponse: IRegionEsen[] = res.body;
        const body: IRegionEsen[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to RegionEsen.
     */
    private convertItemFromServer(region: IRegionEsen): IRegionEsen {
        const copy: IRegionEsen = Object.assign({}, region, {});
        return copy;
    }

    /**
     * Convert a RegionEsen to a JSON which can be sent to the server.
     */
    private convert(region: IRegionEsen): IRegionEsen {
        const copy: IRegionEsen = Object.assign({}, region, {});
        return copy;
    }
}
