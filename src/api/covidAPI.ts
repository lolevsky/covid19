import {countryEntity} from '../model/country';
import {historicalEntity} from '../model/historical';

class CovidAPI {

    api<T>(url: string): Promise<T> {
        return fetch(url, {cache: "reload"})
            .then((response) => this.checkStatus(response))
            .then(response => {
                return response.json() as Promise<T>
            })
    }

    private checkStatus(response : Response) : Promise<Response> {
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response);
        } else {
          let error = new Error(response.statusText);
          throw error;
        }
    }

    public async getAllCountries() : Promise<countryEntity[]> {
        return this.api<countryEntity[]>('https://corona.lmao.ninja/countries?sort=country');
    }

    public async getHistoricalByCountry(country: string) : Promise<historicalEntity> {
        return this.api<historicalEntity>('https://corona.lmao.ninja/v2/historical/'+country);
    }
}

export const covidAPI = new CovidAPI();