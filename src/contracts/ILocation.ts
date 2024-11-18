export interface ILocation {
    info: Info;
    results: ILocationResult[];
}

export interface Info {
    count: number;
    pages: number;
    next: string;
    prev: null;
}

export interface ILocationResult {
    id?: number;
    name?: string;
    type?: string;
    dimension?: string;
    residents: string[];
    url?: string;
    created?: Date;
}