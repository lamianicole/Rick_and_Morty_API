export interface IEpisode {
    info: IInfo;
    results: IEpisodeResult[];
  }
  
  export interface IInfo {
    count: number;
    pages: number;
    next: string;
    prev: null;
  }
  
  export interface IEpisodeResult {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
    url: string;
    created: Date;
  }