import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICountryEsen } from 'app/shared/model/country-esen.model';

export type EntityResponseType = HttpResponse<ICountryEsen>;
export type EntityArrayResponseType = HttpResponse<ICountryEsen[]>;

@Injectable()
export class CountryEsenService {
    private resourceUrl = SERVER_API_URL + 'api/countries';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/countries';

    constructor(private http: HttpClient) {}

    create(country: ICountryEsen): Observable<EntityResponseType> {
        const copy = this.convert(country);
        return this.http
            .post<ICountryEsen>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(country: ICountryEsen): Observable<EntityResponseType> {
        const copy = this.convert(country);
        return this.http
            .put<ICountryEsen>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICountryEsen>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICountryEsen[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICountryEsen[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ICountryEsen = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: EntityArrayResponseType): EntityArrayResponseType {
        const jsonResponse: ICountryEsen[] = res.body;
        const body: ICountryEsen[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to CountryEsen.
     */
    private convertItemFromServer(country: ICountryEsen): ICountryEsen {
        const copy: ICountryEsen = Object.assign({}, country, {});
        return copy;
    }

    /**
     * Convert a CountryEsen to a JSON which can be sent to the server.
     */
    private convert(country: ICountryEsen): ICountryEsen {
        const copy: ICountryEsen = Object.assign({}, country, {});
        return copy;
    }
}
