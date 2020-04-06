import React,  { Component } from 'react';

import Cookies from 'universal-cookie';
import { Container, Dropdown } from 'react-bootstrap';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, Bar, BarChart,
  } from 'recharts';

import * as cookieName from '../../constants/cookiesname';

import { countryEntity } from '../../model/country';
import { historicalEntity, createEmptyHistoricalEntity } from '../../model/historical';
import { timelineData, createTimelineData } from '../../model/timelineData';
import { covidAPI } from '../../api/covidAPI';
import { firebaseAnalytics } from '../firebase/firebase';
import { CustomMenu } from '../custom/CustomMenu';

interface Props {
}

interface State {
    isFetchingCountries: boolean,
    isFetchingData: boolean,
    countries: Array<countryEntity>,
    historicalEntity: historicalEntity,
    timelineData: Array<timelineData>,
    selectedCountryEntity: countryEntity
}

const cookies = new Cookies();

class ReportPage extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            isFetchingCountries: true,
            isFetchingData: true,
            countries: [],
            historicalEntity: createEmptyHistoricalEntity(),
            timelineData: [],
            selectedCountryEntity: cookies.get(cookieName.SELECTED_COUNTRY_ENTETY)
        };
    };

    public componentDidMount() {
        firebaseAnalytics.setCurrentScreen('Report')
        firebaseAnalytics.logEvent('Report - loaded')

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
            if(!!this.state.selectedCountryEntity){
              this.handleCountryClick(this.state.selectedCountryEntity)
            }
        }).catch(err => {
            firebaseAnalytics.logEvent('Report - alert ' + err)
            alert(err + ' Oops, we have some issu, please try to refresh')
        });
    }

    handleCountryClick(country: countryEntity) {
        firebaseAnalytics.logEvent('Report country selected - ' + country.country)

        this.setState({selectedCountryEntity: country, isFetchingData: true});
        cookies.set(cookieName.SELECTED_COUNTRY_ENTETY, country, { path: '/' });

        covidAPI.getHistoricalByCountry(country.country).then((historicalEntity) => {
          this.prepareDataForGraph(historicalEntity)
          this.setState({historicalEntity: historicalEntity, isFetchingData: false})
        }
        ).catch(err => {
            firebaseAnalytics.logEvent('Report - alert ' + err)
            alert(err + ' Oops, we have some issu, please try to refresh')
        });
    }

    prepareDataForGraph(historicalEntity: historicalEntity){
        this.setState({timelineData: []})
        var dataMapping: Array<timelineData>  = []
        var country = historicalEntity;

        Object.entries(country.timeline.cases).map(([date, cases], i) => 
            dataMapping[i] = createTimelineData(
                country.country,
                date,
                cases, 
                0,
                0
            ))

        this.setState({timelineData: dataMapping})
    }

    render() {
        if (this.state == null) {
			return <div style={{display: 'flex', justifyContent: 'center'}}>Loading...</div>
		}
        return (
            <Container>
                <br/>
                <div >{this.state.isFetchingCountries ? 
                                                    <div style={{display: 'flex', justifyContent: 'center'}}>
                                                    'Fetching data...' 
                                                    </div>: 
                    <div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Dropdown>
                                <Dropdown.Toggle  id="dropdown-custom-components">
                                    {!!this.state.selectedCountryEntity? this.state.selectedCountryEntity.country : 'Please select country'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu as={CustomMenu}>
                                    {
                                        this.state.countries.map((country: countryEntity) => 
                                            <Dropdown.Item eventKey={country.country} onClick={() => {this.handleCountryClick(country)}}>{country.country}</Dropdown.Item>
                                        )
                                    }
                                </Dropdown.Menu>
                             </Dropdown>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                        {
                            !!this.state.selectedCountryEntity?
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                <p>
                                Today In <b>{
                                this.state.selectedCountryEntity.country
                                }</b> are <b>{
                                this.state.selectedCountryEntity.cases
                                }</b> cases, <b>{
                                this.state.selectedCountryEntity.recovered
                                }</b> recovered and <b>{
                                this.state.selectedCountryEntity.deaths
                                }</b> deaths
                                </p>  
                                </div>
                                : ''
                        }
                        </div>
                        {this.state.isFetchingData ? '' : 
                            <div>
                                <ResponsiveContainer width='100%' aspect={4.0/3.0}>
                                    <LineChart
                                        data={this.state.timelineData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" tick={{fontSize: 10}}/>
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="cases" stroke="#8884d8" activeDot={{ r: 8 }} />
                                        <Line type="monotone" dataKey="deaths" stroke="#82ca9d" />
                                        <Line type="monotone" dataKey="recovered" stroke="#ffc658" />
                                    </LineChart>
                                </ResponsiveContainer>
                                <br/>
                                <ResponsiveContainer width='100%' aspect={4.0/3.0}>
                                    <BarChart data={this.state.timelineData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" tick={{fontSize: 10}}/>
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="cases" fill="#8884d8" />
                                        <Bar dataKey="deaths" fill="#82ca9d" />
                                        <Bar dataKey="recovered" fill="#ffc658" />
                                    </BarChart>
                                </ResponsiveContainer>
                                <br/>
                                <ResponsiveContainer width='100%' aspect={4.0/3.0}>
                                    <AreaChart width={500}
                                        height={400}
                                        data={this.state.timelineData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" tick={{fontSize: 10}}/>
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="cases" stackId="1" stroke="#8884d8" fill="#8884d8" />
                                        <Area type="monotone" dataKey="deaths" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                                        <Area type="monotone" dataKey="recovered" stackId="1" stroke="#ffc658" fill="#ffc658" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        }
                    </div>
                }</div>
            </Container>
        )
    };
}

export default ReportPage;