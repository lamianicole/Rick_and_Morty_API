export interface ICharacter {
    info: Info;
    results: ICharacterResult[];
}

export interface Info {
}

export interface ICharacterResult {
    id?: number;
    name: string;
    status?: Status;
    species?: Species;
    type?: string;
    gender?: Gender;
    origin?: Origin;
    location?: Location;
    image?: string;
    episode?: string[];
    url?: string;
    created?: Date;
}

export enum Gender {
    Female = "Female",
    Male = "Male",
    Unknown = "unknown",
}

export interface Location {
    name: string;
    url: string;
}

export interface Origin {
    name: Name;
    url: string;
}

export enum Name {
    Abadango = "Abadango",
    EarthC137 = "Earth (C-137)",
    EarthReplacementDimension = "Earth (Replacement Dimension)",
    Unknown = "unknown",
}

export enum Species {
    Alien = "Alien",
    Human = "Human",
}

export enum Status {
    Alive = "Alive",
    Dead = "Dead",
    Unknown = "unknown",
}