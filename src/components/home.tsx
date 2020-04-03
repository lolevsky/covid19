import React, { Component } from 'react';

import Cookies from 'universal-cookie';
import { Container, Dropdown, DropdownButton } from 'react-bootstrap';

import * as cookieName from '../constants/cookiesname';

import { countryEntity } from '../model/country';
import { covidAPI } from '../api/covidAPI';

interface Props {
}

interface State {
    isFetching: boolean;
    countries: Array<countryEntity>
    selectedCountry: string
  }

const cookies = new Cookies();

class HomePage extends Component<Props, State>  {
    constructor(props: any) {
        super(props);
        this.state = {
            isFetching: true,
            countries: [],
            selectedCountry: cookies.get(cookieName.SELECTED_COUNTRY)
        };
    };

    public componentDidMount() {
        covidAPI.getAllCountries().then((countries) =>
          this.setState({ countries: countries , isFetching: false})
        );
    }

    handleClick(country: string) {
        this.setState({selectedCountry: country});
        cookies.set(cookieName.SELECTED_COUNTRY, country, { path: '/' });
    }

    render() {
        return (
            <Container>
                <p>{this.state.isFetching ? 'Fetching users...' : 
                    <div>
                        <label>Select country</label>
                        <DropdownButton id="dropdown-basic-button" title={this.state.selectedCountry} >
                                {
                                    this.state.countries.map((country: countryEntity) => 
                                        <Dropdown.Item eventKey={country.country} onClick={() => {this.handleClick(country.country)}}>{country.country}</Dropdown.Item>
                                    )
                                }
                        </DropdownButton>
                    </div>
                }</p>
            </Container>
        )
    };
}

export default HomePage;
export { HomePage };