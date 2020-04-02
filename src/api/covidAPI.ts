import {countryEntity} from '../model/country';

class CovidAPI {

    public async getAllCountries() : Promise<countryEntity[]> {
        const covidCountriesURL : string = 'https://corona.lmao.ninja/countries?sort=country';
    
        return fetch(covidCountriesURL, {cache: "force-cache"})
          .then((response) => this.checkStatus(response))
          .then((response) => this.parseJSON(response))
          .then((data) => this.resolveCountries(data));
    }

    private checkStatus(response : Response) : Promise<Response> {
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response);
        } else {
          let error = new Error(response.statusText);
          throw error;
        }
    }
    
    private parseJSON(response : Response) : any {
        return response.json();
    }
    
    private resolveCountries (data : any) : Promise<countryEntity[]> {
        const countries = data.map((covidCountry: any) => {
            var country : countryEntity = {
                id: covidCountry.id,
                country: covidCountry.country,
                cases: covidCountry.cases,
                todayCases: covidCountry.todayCases,
                deaths: covidCountry.deaths,
                todayDeaths: covidCountry.todayDeaths,
                recovered: covidCountry.recovered,
                active: covidCountry.active,
                critical: covidCountry.critical,
                updated: covidCountry.updated,
                countryInfo: covidCountry.countryInfo
            };
    
            return country;
        });
    
        return Promise.resolve(countries);
    }
}

export const covidAPI = new CovidAPI();