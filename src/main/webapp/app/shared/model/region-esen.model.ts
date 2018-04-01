export interface IRegionEsen {
    id?: number;
    regionName?: string;
}

export class RegionEsen implements IRegionEsen {
    constructor(public id?: number, public regionName?: string) {}
}
