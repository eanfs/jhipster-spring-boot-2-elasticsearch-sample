export interface ILocationEsen {
    id?: number;
    streetAddress?: string;
    postalCode?: string;
    city?: string;
    stateProvince?: string;
    countryId?: number;
}

export class LocationEsen implements ILocationEsen {
    constructor(
        public id?: number,
        public streetAddress?: string,
        public postalCode?: string,
        public city?: string,
        public stateProvince?: string,
        public countryId?: number
    ) {}
}
