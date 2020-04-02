export interface countryEntity {
    id: number;
    country: string;
    cases: number;
    todayCases: number;
    deaths: number;
    todayDeaths: number;
    recovered: number;
    active: number;
    critical: number;
    updated: number;
    countryInfo: {
        _id: number;
        iso2: string;
        iso3: string;
        lat: number;
        long: number;
        flag: string;
    };
  }
  
  export const createEmptyCountryEntity = () : countryEntity => ({
    id: -1,
    country: "",
    cases: 0,
    todayCases: 0,
    deaths: 0,
    todayDeaths: 0,
    recovered: 0,
    active: 0,
    critical: 0,
    updated: 0,
    countryInfo: {
        _id: -1,
        iso2: "",
        iso3: "",
        lat: 0,
        long: 0,
        flag: ""
    }
  });