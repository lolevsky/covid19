import React, { Component } from 'react';

import { Container, Dropdown, DropdownButton } from 'react-bootstrap';

import { countryEntity } from '../model/country';
import { covidAPI } from '../api/covidAPI';

interface Props {
}

interface State {
    isFetching: boolean;
    countries: Array<countryEntity>
    selectedCountry: string
  }

class HomePage extends Component<Props, State>  {
    constructor(props: any) {
        super(props);
        this.state = {
            isFetching: true,
            countries: [],
            selectedCountry: "Select country"
        };
    };

    public componentDidMount() {
        covidAPI.getAllCountries().then((countries) =>
          this.setState({ countries: countries , isFetching: false})
        );
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
                                        <Dropdown.Item eventKey={country.country} onClick={()=>this.setState({selectedCountry: country.country})}>{country.country}</Dropdown.Item>
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