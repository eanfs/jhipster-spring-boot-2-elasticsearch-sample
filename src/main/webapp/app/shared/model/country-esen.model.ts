export interface ICountryEsen {
    id?: number;
    countryName?: string;
    regionId?: number;
}

export class CountryEsen implements ICountryEsen {
    constructor(public id?: number, public countryName?: string, public regionId?: number) {}
}
