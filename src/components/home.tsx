import React, { Component } from 'react';

import Cookies from 'universal-cookie';
import { Container, Dropdown, DropdownButton } from 'react-bootstrap';

import * as cookieName from '../constants/cookiesname';

import { countryEntity } from '../model/country';
import { historicalEntity, createEmptyHistoricalEntity } from '../model/historical';
import { covidAPI } from '../api/covidAPI';

interface Props {
}

interface State {
    isFetchingCountries: boolean,
    isFetchingData: boolean,
    countries: Array<countryEntity>,
    historicalEntity: historicalEntity,
    selectedCountry: string
  }

const cookies = new Cookies();

class HomePage extends Component<Props, State>  {
    constructor(props: any) {
        super(props);
        this.state = {
            isFetchingCountries: true,
            isFetchingData: true,
            countries: [],
            historicalEntity: createEmptyHistoricalEntity(),
            selectedCountry: cookies.get(cookieName.SELECTED_COUNTRY)
        };
    };

    public componentDidMount() {
        covidAPI.getAllCountries().then((countries) =>{
            countries.sort((obj1, obj2) => {
                if (obj1.country > obj2.country) {
                    return 1;
                }
            
                if (obj1.country < obj2.country) {
                    return -1;
                }
            
                return 0;
            });
            this.setState({ countries: countries , isFetchingCountries: false, isFetchingData: true})
            if(this.state.selectedCountry){
              this.handleCountryClick(this.state.selectedCountry)
            }
        }).catch(err => alert(err));
    }

    handleCountryClick(country: string) {
        this.setState({selectedCountry: country, isFetchingData: true});
        cookies.set(cookieName.SELECTED_COUNTRY, country, { path: '/' });

        covidAPI.getHistoricalByCountry(country).then((historicalEntity) =>
          this.setState({historicalEntity: historicalEntity, isFetchingData: false})
        ).catch(err => alert(err));
    }

    render() {
        if (this.state == null) {
			return <div>Loading...</div>
		}
        return (
            <Container>
                <p>{this.state.isFetchingCountries ? 'Fetching data...' : 
                    <div>
                        <label>Select country</label>
                        <DropdownButton id="dropdown-basic-button" title={this.state.selectedCountry} >
                                {
                                    this.state.countries.map((country: countryEntity) => 
                                        <Dropdown.Item eventKey={country.country} onClick={() => {this.handleCountryClick(country.country)}}>{country.country}</Dropdown.Item>
                                    )
                                }
                        </DropdownButton>
                        {this.state.isFetchingData ? '' : 
                            Object.entries(this.state.historicalEntity.timeline.cases).map(([k, v], i) => 
                                <p>{k} {v}</p>
                            )
                        }
                    </div>
                }</p>
            </Container>
        )
    };
}

export default HomePage;
export { HomePage };